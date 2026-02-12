import Helmet from "react-helmet";
import { Link, usePage } from "@inertiajs/react";
import Layout from "../../Layout/index.jsx";

const App = () => {
  const {
    props: { auth },
  } = usePage();

  const primaryHref = auth?.user ? route("chat") : route("login");
  const primaryLabel = auth?.user ? "Open Live Demo" : "Start the Demo";

  return (
    <>
      <Helmet title="ChatSystem" />
      <div className="landing-bg text-slate-100">
        <section className="relative overflow-hidden pt-28 pb-20">
          <div className="landing-orb landing-orb-left" />
          <div className="landing-orb landing-orb-right" />
          <div className="container mx-auto px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                  Production-ready chat system for Laravel
                </div>
                <div className="space-y-6">
                  <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Ship realtime messaging in days, not sprints.
                    <span className="block text-transparent bg-clip-text landing-gradient">
                      Built for Laravel teams who want to move fast.
                    </span>
                  </h1>
                  <p className="text-lg text-slate-200/80 leading-relaxed">
                    ChatSystem is a batteries-included library for realtime
                    chat, presence, and moderation. This demo app mirrors the
                    exact developer setup: install the package, publish config,
                    and instantly test flows with the UI you see here.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={primaryHref}
                    className="landing-btn landing-btn-primary"
                  >
                    {primaryLabel}
                  </Link>
                  <a
                    href="https://binkode.github.io/laravel-chat-system"
                    target="_blank"
                    rel="noreferrer"
                    className="landing-btn landing-btn-secondary"
                  >
                    Read the docs
                  </a>
                  <a
                    href="https://github.com/binkode/laravel-chat-system"
                    target="_blank"
                    rel="noreferrer"
                    className="landing-btn landing-btn-ghost"
                  >
                    View GitHub
                  </a>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: "3-minute setup",
                      copy: "Composer install + publish config.",
                    },
                    {
                      title: "Realtime by default",
                      copy: "Laravel Echo + broadcast events wired.",
                    },
                    {
                      title: "Modular features",
                      copy: "Channels, roles, and automation-ready hooks.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="landing-card border-white/10 bg-white/5"
                    >
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/70">{item.copy}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="landing-frame">
                <div className="landing-frame-inner">
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>composer require binkode/laravel-chat-system</span>
                    <span>v1.x</span>
                  </div>
                  <pre className="mt-6 text-sm text-white/80 leading-relaxed">
                    <code>{`php artisan vendor:publish --tag=chat-system\nphp artisan migrate\nphp artisan queue:work\nphp artisan websocket:serve`}</code>
                  </pre>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        Built in
                      </p>
                      <p className="mt-2 text-sm text-white">
                        Presence, typing indicators, read receipts.
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        Ships with
                      </p>
                      <p className="mt-2 text-sm text-white">
                        Admin tools, moderation, role controls.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-16">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">
                  Everything you need to validate the library.
                </h2>
                <p className="text-base text-white/70 leading-relaxed">
                  This demo is intentionally developer-first. You can inspect
                  the config, swap auth users, seed conversations, and trigger
                  realtime events to prove the package works before you ship it.
                </p>
                <div className="grid gap-4">
                  {[
                    "Full CRUD for conversations, threads, and participants",
                    "Event-driven architecture with broadcast hooks",
                    "Flexible UI slots for custom React or Vue clients",
                    "Built-in policies and gates for multi-tenant apps",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Realtime messaging",
                    copy: "Sockets + queues wired so you can test presence instantly.",
                  },
                  {
                    title: "Notifications",
                    copy: "Push alerts, email fallbacks, and activity feeds.",
                  },
                  {
                    title: "Moderation",
                    copy: "Pin, archive, and flag content with audit trails.",
                  },
                  {
                    title: "Scalable storage",
                    copy: "Optimized queries for large conversation histories.",
                  },
                ].map((item) => (
                  <div key={item.title} className="landing-card">
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/70">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-16">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-white">
                  Developer experience that feels native.
                </h2>
                <p className="text-base text-white/70 leading-relaxed">
                  The API mirrors Laravel conventions, so your team feels at
                  home. Controllers stay thin, support classes stay focused, and
                  configuration follows Laravel 8-11 conventions.
                </p>
                <div className="landing-card border-white/10 bg-white/5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Example usage
                  </p>
                  <pre className="mt-4 text-sm text-white/80 leading-relaxed">
                    <code>{`composer require binkode/laravel-chat-system\n\nphp artisan vendor:publish --provider="Binkode\\ChatSystem\\ChatSystemServiceProvider" --tag='config'\nphp artisan vendor:publish --provider="Binkode\\ChatSystem\\ChatSystemServiceProvider" --tag='migrations'\nphp artisan vendor:publish --provider="Binkode\\ChatSystem\\ChatSystemServiceProvider" --tag='seeders'\nphp artisan vendor:publish --provider="Binkode\\ChatSystem\\ChatSystemServiceProvider" --tag='factories'\n\nuse Binkode\\ChatSystem\\Traits\\Message\\HasMessage;\nuse Binkode\\ChatSystem\\Traits\\ChatEvent\\CanMakeChatEvent;\nuse Binkode\\ChatSystem\\Contracts\\IChatEventMaker;\n\nclass User implements IChatEventMaker\n{\n    use HasMessage, CanMakeChatEvent;\n}\n\n\$conversation = \$user->conversations()->create([\n  'user_id' => \$user->id,\n  'type'    => 'group',\n  'name'    => 'Laravel Developer\\'s Group',\n]);`}</code>
                  </pre>
                </div>
              </div>
              <div className="space-y-6">
                <div className="landing-card">
                  <h3 className="text-base font-semibold text-white">
                    What to try in this demo
                  </h3>
                  <div className="mt-4 grid gap-3 text-sm text-white/70">
                    <div className="flex items-center justify-between">
                      <span>Seeded users + conversations</span>
                      <span className="text-white/50">ready</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Presence + typing indicators</span>
                      <span className="text-white/50">live</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Role-based permissions</span>
                      <span className="text-white/50">included</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Moderation tools</span>
                      <span className="text-white/50">enabled</span>
                    </div>
                  </div>
                </div>
                <div className="landing-card border-white/10 bg-white/5">
                  <h3 className="text-base font-semibold text-white">
                    Integrates with your stack
                  </h3>
                  <p className="mt-3 text-sm text-white/70">
                    Laravel Echo, Redis, Horizon, Passport, Sanctum, and
                    Inertia/React clients are supported out of the box. Swap UI
                    layers without touching the backend logic.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div className="container mx-auto px-6">
            <div className="landing-cta">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-white">
                  Ready to test ChatSystem in your stack?
                </h2>
                <p className="text-base text-white/70">
                  Spin up the demo, explore the API, and ship your first channel
                  today. No guesswork, just working realtime chat.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={primaryHref}
                  className="landing-btn landing-btn-primary"
                >
                  {primaryLabel}
                </Link>
                <a
                  href="https://binkode.github.io/laravel-chat-system"
                  target="_blank"
                  rel="noreferrer"
                  className="landing-btn landing-btn-secondary"
                >
                  Browse docs
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

App.layout = (page) => <Layout children={page} />;

export default App;
