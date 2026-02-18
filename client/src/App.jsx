// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Download,
//   Link,
//   Search,
//   Sun,
//   Moon,
//   Youtube,
//   Instagram,
//   Facebook,
//   Music,
//   Twitter,
//   MessageCircle,
//   Loader
// } from "lucide-react";
// import "./App.css";

// const API = "http://localhost:5000";

// function App() {
//   const [url, setUrl] = useState("");
//   const [videoInfo, setVideoInfo] = useState(null);
//   const [selectedFormat, setSelectedFormat] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("");
//   const [darkMode, setDarkMode] = useState(true);
//   const [platform, setPlatform] = useState(null);
//   const [downloading, setDownloading] = useState(false);

//   // Detect platform
//   const detectPlatform = (link) => {
//     if (!link) return null;
//     if (link.includes("youtube") || link.includes("youtu.be")) return "youtube";
//     if (link.includes("instagram")) return "instagram";
//     if (link.includes("tiktok")) return "tiktok";
//     if (link.includes("facebook")) return "facebook";
//     if (link.includes("twitter") || link.includes("x.com")) return "x";
//     if (link.includes("reddit")) return "reddit";
//     return null;
//   };

//   useEffect(() => {
//     setPlatform(detectPlatform(url));
//     setVideoInfo(null);
//     setStatus("");
//   }, [url]);

//   const renderIcon = () => {
//     switch (platform) {
//       case "youtube": return <Youtube color="red" />;
//       case "instagram": return <Instagram color="#E1306C" />;
//       case "facebook": return <Facebook color="#1877f2" />;
//       case "tiktok": return <Music color="#000" />;
//       case "x": return <Twitter color="#1DA1F2" />;
//       case "reddit": return <MessageCircle color="#ff4500" />;
//       default: return <Link />;
//     }
//   };

//   // Fetch video info
//   const fetchInfo = async () => {
//     if (!url) return setStatus("Enter a URL");
//     setLoading(true);
//     setStatus("");
//     setVideoInfo(null);

//     try {
//       const res = await axios.post(`${API}/info`, { url });
//       setVideoInfo(res.data);
//       setSelectedFormat(res.data.formats[0]?.format_id || "");
//     } catch {
//       setStatus("Failed to fetch video info ❌");
//     }

//     setLoading(false);
//   };

//   // Download video directly with UI feedback
//   const downloadVideo = () => {
//     if (!videoInfo) return;

//     setDownloading(true);
//     setStatus("Downloading...");

//     const a = document.createElement("a");
//     a.href = `${API}/download?url=${encodeURIComponent(url)}&format_id=${selectedFormat}&title=${encodeURIComponent(videoInfo.title)}`;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();

//     // Update button text after slight delay
//     setTimeout(() => {
//       setDownloading(false);
//       setStatus("Download complete ✅");
//     }, 800);
//   };

//   return (
//     <div className={darkMode ? "app dark" : "app light"}>
//       <nav className="navbar">
//         <div className="logo">
//           <Download size={24} /> GrabIt
//         </div>
//         <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <Sun size={18} /> : <Moon size={18} />}
//         </button>
//       </nav>

//       <div className="card">
//         <h1>Download Any Video</h1>

//         <div className="input-area">
//           <div className="platform-icon">{renderIcon()}</div>
//           <input
//             placeholder="Paste link here..."
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//           />
//         </div>

//         <div className="fetch-wrapper">
//           <button className="fetch-btn" onClick={fetchInfo}>
//             {loading ? <Loader className="spin" size={18} /> : <Search size={18} />} Fetch
//           </button>
//         </div>

//         {platform && <div className="detected">Detected platform: <strong>{platform}</strong></div>}

//         {videoInfo && (
//           <div className="video-preview fade-in">
//             <img src={videoInfo.thumbnail} alt={videoInfo.title} />
//             <h3>{videoInfo.title}</h3>

//             <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
//               {videoInfo.formats.map((f) => (
//                 <option key={f.format_id} value={f.format_id}>{f.quality} ({f.ext})</option>
//               ))}
//             </select>

//             <button className="download-btn" onClick={downloadVideo} disabled={downloading}>
//               {downloading ? "Downloading..." : "Download"}
//             </button>
//           </div>
//         )}

//         {status && <p className="status">{status}</p>}
//       </div>

//       <div className="platforms">
//         <button><Youtube size={20} color="red" /> YouTube</button>
//         <button><Instagram size={20} color="#E1306C" /> Instagram</button>
//         <button><Facebook size={20} color="#1877f2" /> Facebook</button>
//         <button><Music size={20} color="#c71313" /> TikTok</button>
//         <button><Twitter size={20} color="#1DA1F2" /> X</button>
//         <button><MessageCircle size={20} color="#ff4500" /> Reddit</button>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import VideoForm from "./components/VideoForm";
import VideoPreview from "./components/VideoPreview";
import PlatformButtons from "./components/PlatformButtons";
import "./App.css";
import Features from "./components/Feature";
import Footer from "./components/Footer";

function App() {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // ✅ Dark mode state

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      {/* Pass darkMode state and toggle to Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <PlatformButtons darkMode={darkMode} />
      <div className="card">
        <h1>Download Any Video</h1>
        <VideoForm url={url} setUrl={setUrl} setVideoInfo={setVideoInfo} darkMode={darkMode} />
        {videoInfo && <VideoPreview url={url} videoInfo={videoInfo} darkMode={darkMode} />}

      </div>
      <Features/>
      <Footer/>

    </div>
  );
}

export default App;

