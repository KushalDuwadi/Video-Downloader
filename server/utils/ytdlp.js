import youtubedl from "yt-dlp-exec";

// Wrapper to handle Linux/Render automatically
export default function(url, options = {}) {
  const execOptions = { ...options };

  // Only override binary on Linux (Render)
  if (process.platform === "linux") {
    execOptions.overrideBinary = "./node_modules/yt-dlp-exec/bin/yt-dlp";
  }

  return youtubedl(url, execOptions);
}

// For streaming downloads
export const exec = youtubedl.exec;
