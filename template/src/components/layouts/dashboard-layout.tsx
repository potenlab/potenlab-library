import { AppSidebar } from "@/components/layouts/app-sidebar";
import { ContentLayout } from "@/components/layouts/content-layout";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Skip to main content
      </a>
      <AppSidebar />
      <main id="main-content">
        <ContentLayout>{children}</ContentLayout>
      </main>
    </>
  );
}
