import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "@potenlab/ui",
  tagline:
    "A production-ready React component library built with Tailwind CSS 4 and Radix UI",
  favicon: "img/favicon.ico",

  url: "https://potenlab-ui.vercel.app",
  baseUrl: "/",

  organizationName: "potenlab",
  projectName: "potenlab-library",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/potenlab/potenlab-library/tree/main/docs-site/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "@potenlab/ui",
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://potenlab-library.vercel.app",
          label: "Storybook",
          position: "left",
        },
        {
          href: "https://www.npmjs.com/package/@potenlab/ui",
          label: "npm",
          position: "right",
        },
        {
          href: "https://github.com/potenlab/potenlab-library",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Getting Started",
          items: [
            { label: "Installation", to: "/docs/getting-started/installation" },
            { label: "Setup", to: "/docs/getting-started/setup" },
            { label: "Quick Start", to: "/docs/getting-started/quick-start" },
          ],
        },
        {
          title: "Components",
          items: [
            { label: "UI Primitives", to: "/docs/components/ui/button" },
            { label: "Common", to: "/docs/components/common/data-table" },
            {
              label: "Layouts",
              to: "/docs/components/layouts/dashboard-layout",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Storybook",
              href: "https://potenlab-library.vercel.app",
            },
            {
              label: "GitHub",
              href: "https://github.com/potenlab/potenlab-library",
            },
            {
              label: "npm",
              href: "https://www.npmjs.com/package/@potenlab/ui",
            },
          ],
        },
      ],
      copyright: `Copyright \u00a9 ${new Date().getFullYear()} Potenlab.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "css"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
