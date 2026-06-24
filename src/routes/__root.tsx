import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-slate-100">Page not found</h2>
        <p className="mt-2 text-sm text-slate-400">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-slate-100">This page didn't load</h1>
        <p className="mt-2 text-sm text-slate-400">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white">
            Try again
          </button>
          <a href="/" className="rounded-md border border-white/10 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "DecisionPilot AI — Privacy-first business intelligence" },
      { name: "description", content: "Turn private company data into business decisions with hybrid RAG + ML intelligence." },
      { property: "og:title", content: "DecisionPilot AI — Privacy-first business intelligence" },
      { property: "og:description", content: "Turn private company data into business decisions with hybrid RAG + ML intelligence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "DecisionPilot AI — Privacy-first business intelligence" },
      { name: "twitter:description", content: "Turn private company data into business decisions with hybrid RAG + ML intelligence." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/279fb63c-de00-4476-b679-85185792e4da/id-preview-2a3fdf13--dbdd5b60-91b6-499c-8fc0-c4f6466d34a3.lovable.app-1782292287702.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/279fb63c-de00-4476-b679-85185792e4da/id-preview-2a3fdf13--dbdd5b60-91b6-499c-8fc0-c4f6466d34a3.lovable.app-1782292287702.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster theme="dark" position="top-right" richColors />
    </QueryClientProvider>
  );
}
