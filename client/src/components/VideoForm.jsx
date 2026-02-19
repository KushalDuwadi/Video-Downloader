import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search, Loader, Link, Youtube, Instagram, Facebook, Music, Twitter, MessageCircle } from "lucide-react";

/*const API = "http://localhost:5000";*/// use this before using middleware routes  controllers in same file server.js
const API = "http://localhost:5000/api"; // use this after using middleware routes  controllers in separate files server.js
// const API = "https://video-downloader1-chmg.onrender.com/api"; // use this for production

export default function VideoForm({ url, setUrl, setVideoInfo }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [platform, setPlatform] = useState(null);

  const detectPlatform = (link) => {
    if (!link) return null;
    if (link.includes("youtube") || link.includes("youtu.be")) return "youtube";
    if (link.includes("instagram")) return "instagram";
    if (link.includes("tiktok")) return "tiktok";
    if (link.includes("facebook")) return "facebook";
    if (link.includes("twitter") || link.includes("x.com")) return "x";
    if (link.includes("reddit")) return "reddit";
    return null;
  };

  useEffect(() => {
    setPlatform(detectPlatform(url));
    setVideoInfo(null);
    setStatus("");
  }, [url, setVideoInfo]);

  const renderIcon = () => {
    switch (platform) {
      case "youtube": return <Youtube color="red" />;
      case "instagram": return <Instagram color="#E1306C" />;
      case "facebook": return <Facebook color="#1877f2" />;
      case "tiktok": return <Music color="#000" />;
      case "x": return <Twitter color="#1DA1F2" />;
      case "reddit": return <MessageCircle color="#ff4500" />;
      default: return <Link />;
    }
  };

  const fetchInfo = async () => {
    if (!url) return setStatus("Enter a URL");
    setLoading(true);
    setStatus("");
    setVideoInfo(null);

    try {
      const res = await axios.post(`${API}/info`, { url });
      setVideoInfo(res.data);
    } catch {
      setStatus("Failed to fetch video info ❌");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="input-area">
        <div className="platform-icon">{renderIcon()}</div>
        <input placeholder="Paste link here..." value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>

      <div className="fetch-wrapper">
        <button className="fetch-btn" onClick={fetchInfo}>
          {loading ? <Loader className="spin" size={18} /> : <Search size={18} />} Fetch
        </button>
      </div>

      {/* {platform && <div className="detected">Detected platform: <strong>{platform}</strong> */}
       {/* <span className="platform-icon-inline">{renderIcon()}</span></div>} */}
      {status && <p className="status">{status}</p>}
    </>
  );
}
