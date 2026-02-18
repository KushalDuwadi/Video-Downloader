import React from "react";
import { Youtube, Instagram, Facebook, Music, Twitter, MessageCircle } from "lucide-react";

export default function PlatformButtons() {
  return (
    <div className="platforms">
      <button><Youtube size={20} color="red" /> YouTube</button>
      <button><Instagram size={20} color="#E1306C" /> Instagram</button>
      <button><Facebook size={20} color="#1877f2" /> Facebook</button>
      <button><Music size={20} color="#c71313" /> TikTok</button>
      <button><Twitter size={20} color="#1DA1F2" /> X</button>
      <button><MessageCircle size={20} color="#ff4500" /> Reddit</button>
    </div>
  );
}
