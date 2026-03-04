interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return <div className="ml-[324px] pt-5 pr-8 pb-8">{children}</div>;
}
