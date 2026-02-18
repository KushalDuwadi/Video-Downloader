// ......using middle ware controllers and routes in separate files ..........................

// import express from "express";
// import cors from "cors";
// import videoRoutes from "./routes/videoRoutes.js";
// import errorHandler from "./middleware/errorHandler.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api", videoRoutes);

// // global error handler
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () =>
//   console.log(`✅ Server running → http://localhost:${PORT}`)
// );








// // ..... using all controllers middleware and routes in same file ..........................

// import express from "express";
// import cors from "cors";
// import youtubedl from "yt-dlp-exec";
// import sanitize from "sanitize-filename";

// const app = express();
// app.use(cors());
// app.use(express.json());

// /* =========================
//    GET VIDEO INFO
// ========================= */
// app.post("/info", async (req, res) => {
//   const { url } = req.body;
//   if (!url) return res.status(400).json({ error: "URL required" });

//   try {
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
//     console.log(err);
//     res.status(500).json({ error: "Failed to fetch info" });
//   }
// });

// /* =========================
//    DIRECT DOWNLOAD
// ========================= */
// /* =========================
//    DIRECT DOWNLOAD
// ========================= */
// app.get("/download", async (req, res) => {
//   const { url, format_id, title } = req.query;
//   if (!url) return res.status(400).send("URL required");

//   // sanitize and encode filename
//   const safeTitle = encodeURIComponent(sanitize(title || "video")) + ".mp4";

//   res.setHeader(
//     "Content-Disposition",
//     `attachment; filename="${safeTitle}"`
//   );
//   res.setHeader("Content-Type", "video/mp4");

//   try {
//     const proc = youtubedl.exec(url, {
//       format: `${format_id}+bestaudio/best`,
//       output: "-",
//       mergeOutputFormat: "mp4",
//       noPart: true,
//       noKeepVideo: true,
//     });

//     proc.stdout.pipe(res);

//     proc.stderr.on("data", d => console.log(d.toString()));

//     proc.on("close", () => res.end());
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Download failed");
//   }
// });


// app.listen(5000, () =>
//   console.log("✅ Server running → http://localhost:5000")
// );






import express from "express";
import cors from "cors";
import videoRoutes from "./routes/videoRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import ffmpegPath from "ffmpeg-static";

// Make ffmpeg available for yt-dlp
process.env.FFMPEG_PATH = ffmpegPath;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", videoRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running → http://localhost:${PORT}`)
);
