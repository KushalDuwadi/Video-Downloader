// import youtubedl from "yt-dlp-exec"; // use this directly
// import sanitize from "sanitize-filename";

// /* =========================
//    GET VIDEO INFO
// ========================= */
// export const getVideoInfo = async (req, res, next) => {
//   const { url } = req.body;
//   if (!url) return res.status(400).json({ error: "URL required" });

//   try {
//     // No overrideBinary needed
//     const info = await youtubedl(url, {
//       dumpSingleJson: true,
//       skipDownload: true,
//       noWarnings: true,
//     });

//     const seen = new Set();
//     const formats = info.formats
//       .filter(f => f.vcodec !== "none" && f.height)
//       .sort((a, b) => b.height - a.height)
//       .filter(f => {
//         const key = `${f.height}-${f.vcodec}`;
//         if (seen.has(key)) return false;
//         seen.add(key);
//         return true;
//       })
//       .map(f => ({
//         format_id: f.format_id,
//         quality: `${f.height}p`,
//         ext: f.ext,
//       }));

//     res.json({
//       title: info.title,
//       thumbnail: info.thumbnail,
//       formats,
//     });
//   } catch (err) {
//     console.error("Error fetching video info:", err);
//     next(err);
//   }
// };

// /* =========================
//    DIRECT DOWNLOAD
// ========================= */
// export const downloadVideo = async (req, res, next) => {
//   const { url, format_id, title } = req.query;
//   if (!url) return res.status(400).send("URL required");

//   const safeTitle = encodeURIComponent(sanitize(title || "video")) + ".mp4";

//   res.setHeader("Content-Disposition", `attachment; filename="${safeTitle}"`);
//   res.setHeader("Content-Type", "video/mp4");

//   try {
//     const proc = youtubedl.exec(url, {
//       format: `${format_id}+bestaudio/best`,
//       output: "-", // stream to stdout
//       mergeOutputFormat: "mp4",
//       noPart: true,
//       noKeepVideo: true,
//     });

//     proc.stdout.pipe(res); // stream directly to response
//     proc.stderr.on("data", d => console.error(d.toString()));
//     proc.on("close", () => res.end());
//   } catch (err) {
//     console.error("Error downloading video:", err);
//     next(err);
//   }
// };



import youtubedl from "../utils/ytdlp.js";
import sanitize from "sanitize-filename";

export const getVideoInfo = async (req, res, next) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL required" });

  try {
    const info = await youtubedl(url, {
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
    const proc = youtubedl.exec(url, {
      format: `${format_id}+bestaudio/best`,
      output: "-",
      mergeOutputFormat: "mp4",
      noPart: true,
      noKeepVideo: true,
      overrideBinary: "./node_modules/yt-dlp-exec/bin/yt-dlp", // use bundled binary
    });

    proc.stdout.pipe(res);
    proc.stderr.on("data", d => console.log(d.toString()));
    proc.on("close", () => res.end());
  } catch (err) {
    next(err);
  }
};

