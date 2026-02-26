import { ReactNode, useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { GlobalSearch } from './GlobalSearch';

interface AppShellProps {
  children: ReactNode;
  title?: string;
  actions?: ReactNode;
}

export function AppShell({ children, title, actions }: AppShellProps) {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <div className="pl-60">

        {/* 🔔 Demo Notice Banner */}
        {showNotice && (
          <div className="sticky top-0 z-40 w-full bg-indigo-600 text-white text-sm px-6 py-2 flex items-center justify-between">
            <span className="font-medium tracking-wide">
              Demo Environment • Core Enrichment Engine Connected to Live LLM
            </span>
            <button
              onClick={() => setShowNotice(false)}
              className="text-white hover:opacity-70 text-sm"
            >
              ✕
            </button>
          </div>
        )}

        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-6">
          <div className="flex items-center gap-4">
            {title && (
              <h1 className="text-base font-semibold text-foreground">
                {title}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-3">
            <GlobalSearch />
            {actions}
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}