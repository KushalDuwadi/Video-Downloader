import React, { useState } from "react";
import { Download, Loader } from "lucide-react";

export default function VideoPreview({ url, videoInfo }) {
  const [selectedFormat, setSelectedFormat] = useState(videoInfo.formats[0]?.format_id || "");
  const [downloading, setDownloading] = useState(false);
  const [status, setStatus] = useState("");

  const downloadVideo = async () => {
  try {
    setDownloading(true);
    setStatus("Downloading...");

    const response = await fetch(
      `http://localhost:5000/api/download?url=${encodeURIComponent(url)}&format_id=${selectedFormat}&title=${encodeURIComponent(videoInfo.title)}`
    );

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = videoInfo.title + ".mp4";
    a.click();

    window.URL.revokeObjectURL(downloadUrl);

    setStatus("Download complete ✅");
  } catch (err) {
    setStatus("Download failed ❌");
  } finally {
    setDownloading(false);
  }
};



  return (
    <div className="video-preview fade-in">
      <img src={videoInfo.thumbnail} alt={videoInfo.title} />
      <h3>{videoInfo.title}</h3>

      <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
        {videoInfo.formats.map((f) => (
          <option key={f.format_id} value={f.format_id}>{f.quality} ({f.ext})</option>
        ))}
      </select>

      <button className="download-btn" onClick={downloadVideo} disabled={downloading}>
        {downloading ? <Loader className="spin" size={18} /> : <Download size={18} />} {downloading ? "Downloading..." : "Download"}
      </button>

      {status && <p className="status">{status}</p>}
    </div>
  );
}
