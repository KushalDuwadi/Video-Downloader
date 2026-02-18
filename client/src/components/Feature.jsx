import React from "react";
import { Zap, Clock, Shield, ThumbsUp, Globe, Video } from "lucide-react";

const featuresList = [
  { icon: <Zap size={28} color="#4f46e5" />, title: "Fast Download", description: "Get your videos instantly with high speed downloads." },
  { icon: <Clock size={28} color="#22c55e" />, title: "Auto Detection", description: "Paste a link and our app detects the platform automatically." },
  { icon: <Shield size={28} color="#f59e0b" />, title: "Privacy", description: "We never store your data or track your downloads." },
  { icon: <ThumbsUp size={28} color="#ef4444" />, title: "Easy to Use", description: "Clean and simple interface for everyone." },
  { icon: <Globe size={28} color="#0ea5e9" />, title: "Multi-Platform", description: "Download videos from YouTube, Facebook, Instagram, TikTok, X, Reddit, and more." },
  { icon: <Video size={28} color="#8b5cf6" />, title: "High Quality", description: "Supports HD and Full HD downloads for the best viewing experience." },
];


 function Features() {
  return (
    <div className="features-card">
      <h2>Features</h2>
      <div className="features-grid">
        {featuresList.map((feature, index) => (
          <div key={index} className="feature-item">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Features;
