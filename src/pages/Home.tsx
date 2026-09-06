import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { initContributors } from "../utils/contributors";
import { initDonators } from "../utils/donators";
import { initEndstonePlugins } from "../utils/endstone-plugins";
import { initProducts } from "../utils/products";
import { initStats } from "../utils/stats";
import { initWebApps } from "../utils/web-apps";

const navigation = [
  ["#statistics", "Statistics"],
  ["#contributors", "Contributors"],
  ["#donators", "Donators"],
  ["#products", "Blueprints"],
  ["#apps", "Web Apps"],
  ["#endstone", "Minecraft Plugins"],
] as const;
const skeleton = (
  <div className="glass shimmer h-40 rounded-lg border border-neutral-800" />
);

export function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add(
      "min-h-screen",
      "bg-neutral-950",
      "text-neutral-100",
    );
    const frame = requestAnimationFrame(() => {
      initContributors();
      initDonators();
      initStats();
      initProducts();
      initEndstonePlugins();
      initWebApps();
    });
    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove(
        "min-h-screen",
        "bg-neutral-950",
        "text-neutral-100",
      );
    };
  }, []);

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:border focus:border-blue-400 focus:bg-neutral-950 focus:px-3 focus:py-2 focus:text-neutral-100"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className="glass sticky top-0 z-20 flex items-center justify-between rounded-b-xl border-b border-neutral-800 px-4 py-3 shadow-lg sm:px-6 lg:px-8"
      >
        <a
          href="#hero"
          className="flex items-center gap-3 font-bold text-neutral-200"
        >
          <img
            src="/images/euphoria.png"
            alt="Euphoria Development logo"
            className="glow-animation h-8 w-8 rounded-full border border-neutral-700"
          />
          Euphoria Development
        </a>
        <div className="hidden gap-5 md:flex">
          {navigation.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium hover:text-blue-300"
            >
              {label}
            </a>
          ))}
          <Link to="/docs" className="text-sm font-medium hover:text-blue-300">
            Docs
          </Link>
        </div>
        <button
          type="button"
          className="rounded-lg border border-neutral-700 p-2 md:hidden"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Menu
        </button>
        {menuOpen && (
          <div className="mobile-menu">
            {navigation.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <Link to="/docs" onClick={() => setMenuOpen(false)}>
              Docs
            </Link>
          </div>
        )}
      </nav>
      <main id="hero">
        <section className="relative overflow-hidden px-4 py-24 text-center sm:py-36">
          <div className="animated-gradient absolute inset-0" />
          <div className="relative mx-auto max-w-4xl">
            <h1 className="fade-in-up text-4xl font-extrabold sm:text-6xl">
              Welcome to Euphoria Development
            </h1>
            <p className="fade-in-up mx-auto mt-5 max-w-2xl text-lg text-neutral-400 delay-100 sm:text-2xl">
              Blueprint-powered themes and extensions for Pterodactyl Panel,
              plus open-source Endstone plugins for Minecraft servers.
            </p>
            <a
              href="#products"
              className="fade-in-up mt-8 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white delay-200 hover:bg-blue-500"
            >
              Browse Blueprints
            </a>
          </div>
        </section>
        <Stats />
        <DynamicSection
          id="contributors"
          title="Contributors"
          gridId="contributors-grid"
          className="bg-neutral-900"
        />
        <DynamicSection id="donators" title="Donators" gridId="donators-grid" />
        <GetInvolved />
        <Products />
        <DynamicSection
          id="apps"
          title="Web Apps"
          gridId="web-apps-grid"
          className="bg-neutral-900"
        />
        <DynamicSection
          id="endstone"
          title="Minecraft Plugins"
          gridId="endstone-plugins-grid"
        />
        <footer className="glass mt-4 border-t border-neutral-800 px-4 py-8 text-center text-neutral-400">
          <p>© 2026 Euphoria Development. All rights reserved.</p>
          <div className="mt-3 flex justify-center gap-3 text-sm">
            <Link to="/legal/privacy-policy">Privacy Policy</Link>
            <Link to="/legal/refund-policy">Refund Policy</Link>
            <Link to="/legal/terms-and-conditions">Terms &amp; Conditions</Link>
          </div>
        </footer>
      </main>
    </>
  );
}

function Stats() {
  return (
    <section
      id="statistics"
      className="glass-light border-y border-neutral-800 px-4 py-12"
    >
      <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-3">
        <Stat id="total-projects" label="Total Projects" value="9" />
        <Stat id="api-calls" label="API Calls" value="12,727" />
        <Stat id="active-panels" label="Active Panels" value="1,275" />
      </div>
    </section>
  );
}
function Stat({
  id,
  label,
  value,
}: {
  id: string;
  label: string;
  value: string;
}) {
  return (
    <div className="glass card-hover rounded-lg border border-neutral-800 p-6">
      <strong id={id} className="text-3xl text-blue-400">
        {value}
      </strong>
      <p className="mt-1 text-neutral-400">{label}</p>
    </div>
  );
}
function DynamicSection({
  id,
  title,
  gridId,
  className = "",
}: {
  id: string;
  title: string;
  gridId: string;
  className?: string;
}) {
  return (
    <section id={id} className={`px-4 py-12 ${className}`}>
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div
          id={gridId}
          className="mt-8 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3"
        >
          {skeleton}
        </div>
      </div>
    </section>
  );
}
function GetInvolved() {
  return (
    <section
      id="get-involved"
      className="bg-neutral-900 px-4 py-12 text-center"
    >
      <h2 className="text-3xl font-bold">Get Involved</h2>
      <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
        Build, support, and shape Euphoria Development with the community.
      </p>
      <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-3">
        <Action
          title="GitHub"
          text="Contribute to our open-source projects."
          href="https://github.com/EuphoriaDevelopmentOrg"
        />
        <Action
          title="Discord"
          text="Join the community and get support."
          href="https://discord.euphoriadevelopment.uk"
        />
        <Action
          title="Support"
          text="Help fund ongoing development."
          href="https://github.com/sponsors/RepGraphics"
        />
      </div>
    </section>
  );
}
function Action({
  title,
  text,
  href,
}: {
  title: string;
  text: string;
  href: string;
}) {
  return (
    <a
      className="glass card-hover rounded-lg border border-neutral-800 p-6"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-neutral-400">{text}</p>
    </a>
  );
}
function Products() {
  return (
    <section id="products" className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold">Blueprints</h2>
        <div className="mt-10">
          <h3 className="text-xl font-semibold">
            Blueprint Addons{" "}
            <span className="text-base font-normal text-neutral-400">
              (<span id="blueprint-addon-count">...</span>)
            </span>
          </h3>
          <div
            id="blueprint-addons-grid"
            className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {skeleton}
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-xl font-semibold">
            Blueprint Themes{" "}
            <span className="text-base font-normal text-neutral-400">
              (<span id="blueprint-theme-count">...</span>)
            </span>
          </h3>
          <div
            id="blueprint-themes-grid"
            className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {skeleton}
          </div>
        </div>
        <p
          id="blueprint-products-note"
          className="mt-6 text-center text-sm text-neutral-400"
        />
      </div>
    </section>
  );
}
