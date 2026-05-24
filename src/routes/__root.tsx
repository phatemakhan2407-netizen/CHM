import { Outlet, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/site/SEO";
import { Analytics } from "@/components/site/Analytics";
import { Toaster } from "sonner";

export function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-glow px-5 py-2.5 text-sm font-semibold text-white purple-glow"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ErrorComponent({ error, reset }: { error: Error; reset?: () => void }) {
  console.error(error);
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { navigate(0); if (reset) reset(); }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-glow px-5 py-2.5 text-sm font-semibold text-white purple-glow"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold hover:bg-surface-2 transition"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO />
      <Analytics />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-right" theme="dark" richColors closeButton />
    </div>
  );
}
