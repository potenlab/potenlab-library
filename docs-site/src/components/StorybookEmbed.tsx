import React from "react";

interface StorybookEmbedProps {
  storyId: string;
  height?: number;
  showPanel?: boolean;
}

const STORYBOOK_URL = "https://potenlab-library.vercel.app";

export default function StorybookEmbed({
  storyId,
  height = 300,
  showPanel = false,
}: StorybookEmbedProps) {
  const panelParam = showPanel ? "" : "&panel=false";
  const src = `${STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story${panelParam}`;
  const fullUrl = `${STORYBOOK_URL}/?path=/story/${storyId}`;

  return (
    <div className="storybook-embed">
      <iframe src={src} height={height} title={`Storybook: ${storyId}`} loading="lazy" />
      <a className="storybook-embed__link" href={fullUrl} target="_blank" rel="noopener noreferrer">
        Open in Storybook →
      </a>
    </div>
  );
}
