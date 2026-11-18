import { ArrowUpRight } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import AquadactylPanelDemo from "./AquadactylPanelDemo";
import { aquadactylDemoUrl } from "@/utils/projects";
import "./PanelPreview.css";

// AquadactylPanelDemo.tsx is copied unchanged from Aquadactyl/website's
// src/components/PanelPreview.tsx at fa15b9e. Keep it aligned with that preview.

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function PanelPreview() {
  return (
    <div
      className={`hero-preview aquadactyl-preview ${jetbrainsMono.variable}`}
      role="region"
      aria-label="Aquadactyl panel preview"
    >
      <AquadactylPanelDemo />
      <div className="aquadactyl-preview-caption">
        <a href={aquadactylDemoUrl} target="_blank" rel="noopener noreferrer">
          Open live demo <ArrowUpRight size={12} aria-hidden="true" />
        </a>
        <span>Illustrative interface · sample data</span>
      </div>
    </div>
  );
}
