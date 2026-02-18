import youtubedl, { exec } from "../utils/ytdlp.js";
import sanitize from "sanitize-filename";

export const getVideoInfo = async (req, res, next) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL required" });

  try {
    // normalize YouTube Shorts URLs
    let normalizedUrl = url;
    if (url.includes("youtube.com/shorts/")) {
      const id = url.split("/shorts/")[1].split(/[?&]/)[0];
      normalizedUrl = `https://www.youtube.com/watch?v=${id}`;
    }

    const info = await youtubedl(normalizedUrl, {
      dumpSingleJson: true,
      skipDownload: true,
      noWarnings: true,
    });

    const seen = new Set();
    const formats = info.formats
      .filter(f => f.vcodec !== "none" && f.height)
      .sort((a, b) => b.height - a.height)
      .filter(f => {
        const key = `${f.height}-${f.vcodec}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map(f => ({
        format_id: f.format_id,
        quality: `${f.height}p`,
        ext: f.ext,
      }));

    res.json({
      title: info.title,
      thumbnail: info.thumbnail,
      formats,
    });
  } catch (err) {
    console.log("Error fetching video info:", err.message);
    next(err);
  }
};

export const downloadVideo = async (req, res, next) => {
  const { url, format_id, title } = req.query;
  if (!url) return res.status(400).send("URL required");

  const safeTitle = encodeURIComponent(sanitize(title || "video")) + ".mp4";

  res.setHeader("Content-Disposition", `attachment; filename="${safeTitle}"`);
  res.setHeader("Content-Type", "video/mp4");

  try {
    // normalize Shorts URLs for download too
    let normalizedUrl = url;
    if (url.includes("youtube.com/shorts/")) {
      const id = url.split("/shorts/")[1].split(/[?&]/)[0];
      normalizedUrl = `https://www.youtube.com/watch?v=${id}`;
    }

    const proc = exec(normalizedUrl, {
      format: `${format_id}+bestaudio/best`,
      output: "-",
      mergeOutputFormat: "mp4",
      noPart: true,
      noKeepVideo: true,
    });

    proc.stdout.pipe(res);
    proc.stderr.on("data", d => console.log(d.toString()));
    proc.on("close", () => res.end());
  } catch (err) {
    console.log("Error downloading video:", err.message);
    next(err);
  }
};
