import { Link, usePage } from "@inertiajs/react";

export default function Footer() {
  const {
    props: { auth },
  } = usePage();

  const primaryHref = auth?.user ? route("chat") : route("login");
  const primaryLabel = auth?.user ? "Open Live Demo" : "Start the Demo";

  return (
    <footer className="relative pb-12">
      <div className="container mx-auto px-6">
        <div className="landing-card border-white/10 bg-white/5">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                ChatSystem
              </p>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                Keep your product conversations fast, searchable, and realtime.
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                Laravel-native chat infrastructure with presence, moderation, and
                production-ready flows for modern teams.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href={primaryHref} className="landing-btn landing-btn-primary">
                {primaryLabel}
              </Link>
              <a
                href="https://binkode.github.io/laravel-chat-system"
                target="_blank"
                rel="noreferrer"
                className="landing-btn landing-btn-secondary"
              >
                Documentation
              </a>
              <a
                href="https://github.com/binkode/laravel-chat-system"
                target="_blank"
                rel="noreferrer"
                className="landing-btn landing-btn-ghost"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.18em] text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} ChatSystem by Binkode</span>
            <div className="flex items-center gap-4">
              <span>Laravel 8-11</span>
              <span>Realtime Ready</span>
              <span>Inertia + React</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
