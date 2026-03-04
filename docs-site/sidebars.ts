import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/installation",
        "getting-started/setup",
        "getting-started/quick-start",
        "getting-started/admin-panel",
      ],
    },
    {
      type: "category",
      label: "UI Primitives",
      items: [
        "components/ui/accordion",
        "components/ui/alert-dialog",
        "components/ui/avatar",
        "components/ui/badge",
        "components/ui/button",
        "components/ui/card",
        "components/ui/checkbox",
        "components/ui/dialog",
        "components/ui/dropdown-menu",
        "components/ui/input",
        "components/ui/label",
        "components/ui/select",
        "components/ui/separator",
        "components/ui/sheet",
        "components/ui/sidebar",
        "components/ui/skeleton",
        "components/ui/sonner",
        "components/ui/switch",
        "components/ui/table",
        "components/ui/tabs",
        "components/ui/tooltip",
      ],
    },
    {
      type: "category",
      label: "Common Components",
      items: [
        "components/common/data-table",
        "components/common/form-field",
        "components/common/labeled-switch",
        "components/common/page-header",
        "components/common/pagination-controls",
        "components/common/search-bar",
        "components/common/tab-navigation",
      ],
    },
    {
      type: "category",
      label: "Layout Components",
      items: [
        "components/layouts/dashboard-layout",
        "components/layouts/content-layout",
      ],
    },
    {
      type: "category",
      label: "Design Tokens",
      items: [
        "design-tokens/colors",
        "design-tokens/typography",
        "design-tokens/spacing",
      ],
    },
    {
      type: "category",
      label: "Guides",
      items: ["guides/import-paths", "guides/theming", "guides/dark-mode"],
    },
  ],
};

export default sidebars;
