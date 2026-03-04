import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

function HomepageHeader() {
  return (
    <header
      style={{
        padding: "4rem 0",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <Heading as="h1" className="hero__title">
          @potenlab/ui
        </Heading>
        <p className="hero__subtitle" style={{ fontSize: "1.25rem" }}>
          A production-ready React component library built with Tailwind CSS 4
          and Radix UI
        </p>
        <code
          style={{
            display: "inline-block",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            background: "var(--ifm-color-emphasis-200)",
            borderRadius: "8px",
            margin: "1.5rem 0",
          }}
        >
          npm install @potenlab/ui
        </code>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started/installation"
          >
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/components/ui/button"
          >
            Components
          </Link>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    title: "30+ Components",
    description:
      "UI primitives, common patterns, and layout components ready for production use.",
  },
  {
    title: "Tailwind CSS 4",
    description:
      "Built on Tailwind CSS 4 with design tokens as CSS custom properties.",
  },
  {
    title: "Radix UI Primitives",
    description:
      "Accessible, unstyled primitives from Radix UI with Potenlab styling.",
  },
  {
    title: "TypeScript First",
    description:
      "Full TypeScript support with exported types for all components.",
  },
  {
    title: "Dark Mode",
    description:
      "Built-in dark mode support via CSS custom properties and .dark class.",
  },
  {
    title: "Tree-Shakeable",
    description:
      "Multiple entry points for optimized imports — only bundle what you use.",
  },
];

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Home"
      description={siteConfig.tagline}
    >
      <HomepageHeader />
      <main>
        <section style={{ padding: "3rem 0" }}>
          <div className="container">
            <div className="row">
              {features.map((f) => (
                <div key={f.title} className="col col--4" style={{ marginBottom: "2rem" }}>
                  <Heading as="h3">{f.title}</Heading>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
