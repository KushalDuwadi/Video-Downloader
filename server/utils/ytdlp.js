// import youtubedl from "yt-dlp-exec";

// export default youtubedl;



import youtubedl from "yt-dlp-exec";

// Create a wrapper for Linux/Render
export default function(url, options = {}) {
  // Use the bundled binary provided by yt-dlp-exec
  const execOptions = { ...options };
  if (process.platform === "linux") {
    execOptions.overrideBinary = "./node_modules/yt-dlp-exec/bin/yt-dlp";
  }
  return youtubedl(url, execOptions);
}

export const exec = youtubedl.exec;
