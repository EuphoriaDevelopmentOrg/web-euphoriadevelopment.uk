import {
  Activity,
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  ChartColumn,
  CodeXml,
  ExternalLink,
  GitFork,
  Handshake,
  Heart,
  Menu,
  MessageCircle,
  Palette,
  Puzzle,
  Server,
  Star,
  Tag,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchContributors, type Contributor } from "../utils/contributors";
import { fetchDonators, type Donator } from "../utils/donators";
import {
  fetchBlueprintProducts,
  type BlueprintProduct,
} from "../utils/products";
import { fetchSiteStats, type SiteStats } from "../utils/stats";
import { fetchWebApps, type WebApp } from "../utils/web-apps";

const navigation = [
  ["#statistics", "Statistics", ChartColumn],
  ["#contributors", "Contributors", Users],
  ["#donators", "Donators", Heart],
  ["#products", "Blueprints", Puzzle],
  ["#apps", "Web Apps", AppWindow],
] as const;
const skeleton = (
  <div className="glass shimmer h-40 rounded-lg border border-neutral-800" />
);

export function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contributors, setContributors] = useState<Contributor[] | null>(null);
  const [donators, setDonators] = useState<Donator[] | null>(null);
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [products, setProducts] = useState<BlueprintProduct[] | null>(null);
  const [webApps, setWebApps] = useState<WebApp[] | null>(null);

  useEffect(() => {
    document.body.classList.add(
      "min-h-screen",
      "bg-neutral-950",
      "text-neutral-100",
    );
    void fetchContributors()
      .then(setContributors)
      .catch(() => setContributors([]));
    void fetchDonators()
      .then(setDonators)
      .catch(() => setDonators([]));
    void fetchSiteStats()
      .then(setStats)
      .catch(() => setStats(null));
    void fetchBlueprintProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
    void fetchWebApps()
      .then(setWebApps)
      .catch(() => setWebApps([]));
    return () => {
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
        <div className="hidden gap-4 lg:flex">
          {navigation.map(([href, label, Icon]) => (
            <a
              key={href}
              href={href}
              className="inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap hover:text-blue-300"
            >
              <Icon aria-hidden="true" className="size-4 shrink-0" />
              {label}
            </a>
          ))}
          <Link
            to="/docs"
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-blue-300"
          >
            <BookOpen aria-hidden="true" className="size-4 shrink-0" />
            Docs
          </Link>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 p-2 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X aria-hidden="true" className="size-5 shrink-0" />
          ) : (
            <Menu aria-hidden="true" className="size-5 shrink-0" />
          )}
          {menuOpen ? "Close" : "Menu"}
        </button>
        {menuOpen && (
          <div id="mobile-navigation" className="mobile-menu flex lg:hidden">
            {navigation.map(([href, label, Icon]) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                {label}
              </a>
            ))}
            <Link
              to="/docs"
              className="inline-flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <BookOpen aria-hidden="true" className="size-4 shrink-0" />
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
              plus web apps and APIs for your community.
            </p>
            <a
              href="#products"
              className="fade-in-up mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white delay-200 hover:bg-blue-500"
            >
              Browse Blueprints
              <ArrowRight aria-hidden="true" className="size-5 shrink-0" />
            </a>
          </div>
        </section>
        <Stats stats={stats} />
        <PeopleSection
          id="contributors"
          title="Contributors"
          people={contributors}
          kind="contributor"
          className="bg-neutral-900"
        />
        <PeopleSection
          id="donators"
          title="Donators"
          people={donators}
          kind="donator"
        />
        <GetInvolved />
        <Products products={products} />
        <WebApps apps={webApps} />
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

function Stats({ stats }: { stats: SiteStats | null }) {
  return (
    <section
      id="statistics"
      className="glass-light border-y border-neutral-800 px-4 py-12"
    >
      <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-3">
        <Stat label="Total Projects" value={9} icon={Boxes} />
        <Stat
          label="API Calls"
          value={stats ? stats.totalApiCalls : 12727}
          icon={Activity}
        />
        <Stat
          label="Active Panels"
          value={stats ? stats.totalInstalls : 1275}
          icon={Server}
        />
      </div>
    </section>
  );
}
function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
}) {
  return (
    <div className="glass card-hover rounded-lg border border-neutral-800 p-6">
      <div className="flex items-center justify-between gap-3">
        <strong className="text-3xl text-blue-400">
          {value.toLocaleString()}
        </strong>
        <Icon aria-hidden="true" className="size-7 shrink-0 text-blue-400" />
      </div>
      <p className="mt-1 text-neutral-400">{label}</p>
    </div>
  );
}
function SectionTitle({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) {
  return (
    <h2 className="flex items-center justify-center gap-3 text-3xl font-bold">
      <Icon aria-hidden="true" className="size-7 shrink-0 text-blue-400" />
      {title}
    </h2>
  );
}
function PeopleSection({
  id,
  title,
  people,
  kind,
  className = "",
}: {
  id: string;
  title: string;
  people: (Contributor | Donator)[] | null;
  kind: "contributor" | "donator";
  className?: string;
}) {
  return (
    <section id={id} className={`px-4 py-12 ${className}`}>
      <div className="mx-auto max-w-6xl text-center">
        <SectionTitle
          title={title}
          icon={kind === "contributor" ? Users : Heart}
        />
        <div className="mt-8 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
          {people === null && skeleton}
          {people?.length === 0 && (
            <p className="col-span-full text-center text-neutral-400">
              Unable to load {title.toLowerCase()} at this time.
            </p>
          )}
          {people?.map((person) => (
            <PersonCard
              key={`${person.name}-${person.link ?? ""}`}
              person={person}
              kind={kind}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
function PersonCard({
  person,
  kind,
}: {
  person: Contributor | Donator;
  kind: "contributor" | "donator";
}) {
  const avatar =
    person.image ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=3b82f6&color=fff&size=96`;
  const card = (
    <>
      <div className="flex items-start gap-3">
        <img
          src={avatar}
          alt={person.name}
          className="h-12 w-12 shrink-0 rounded-full border border-neutral-700 object-cover sm:h-14 sm:w-14"
          loading="lazy"
          decoding="async"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="truncate text-sm font-semibold text-neutral-100 sm:text-base">
              {person.name}
            </h3>
            <span className="shrink-0 rounded-full border border-blue-500/20 bg-blue-500/15 px-2 py-1 text-xs text-blue-300">
              {kind === "contributor"
                ? "Contributor"
                : (person as Donator).donation || "Supporter"}
            </span>
          </div>
          <p className="mt-1 text-sm text-neutral-400">
            {kind === "contributor"
              ? (person as Contributor).contribution || "Contributor"
              : "Thank you for supporting Euphoria Development."}
          </p>
        </div>
      </div>
    </>
  );
  const className =
    "glass card-hover rounded-lg border border-neutral-800 p-4 text-left shadow sm:p-6";
  return person.link ? (
    <a
      className={className}
      href={person.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {card}
    </a>
  ) : (
    <article className={className}>{card}</article>
  );
}
function GetInvolved() {
  return (
    <section
      id="get-involved"
      className="bg-neutral-900 px-4 py-12 text-center"
    >
      <SectionTitle title="Get Involved" icon={Handshake} />
      <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
        Build, support, and shape Euphoria Development with the community.
      </p>
      <div className="mx-auto mt-8 grid max-w-4xl gap-5 md:grid-cols-3">
        <Action
          title="GitHub"
          text="Contribute to our open-source projects."
          href="https://github.com/EuphoriaDevelopmentOrg"
          icon={CodeXml}
        />
        <Action
          title="Discord"
          text="Join the community and get support."
          href="https://discord.euphoriadevelopment.uk"
          icon={MessageCircle}
        />
        <Action
          title="Support"
          text="Help fund ongoing development."
          href="https://github.com/sponsors/RepGraphics"
          icon={Heart}
        />
      </div>
    </section>
  );
}
function Action({
  title,
  text,
  href,
  icon: Icon,
}: {
  title: string;
  text: string;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <a
      className="glass card-hover rounded-lg border border-neutral-800 p-6"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon aria-hidden="true" className="mx-auto mb-4 size-8 text-blue-400" />
      <h3 className="flex items-center justify-center gap-2 text-xl font-semibold">
        {title}
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 text-neutral-400"
        />
      </h3>
      <p className="mt-2 text-neutral-400">{text}</p>
    </a>
  );
}
function Products({ products }: { products: BlueprintProduct[] | null }) {
  const addons = products?.filter((product) => product.type === "addon") ?? [];
  const themes = products?.filter((product) => product.type === "theme") ?? [];
  return (
    <section id="products" className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="Blueprints" icon={Puzzle} />
        <div className="mt-10">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <Puzzle
              aria-hidden="true"
              className="size-5 shrink-0 text-blue-400"
            />
            Blueprint Addons{" "}
            <span className="text-base font-normal text-neutral-400">
              ({products === null ? "…" : addons.length})
            </span>
          </h3>
          <ProductGrid
            products={addons}
            loading={products === null}
            emptyMessage="No Blueprint addons found yet."
          />
        </div>
        <div className="mt-10">
          <h3 className="flex items-center gap-2 text-xl font-semibold">
            <Palette
              aria-hidden="true"
              className="size-5 shrink-0 text-blue-400"
            />
            Blueprint Themes{" "}
            <span className="text-base font-normal text-neutral-400">
              ({products === null ? "…" : themes.length})
            </span>
          </h3>
          <ProductGrid
            products={themes}
            loading={products === null}
            emptyMessage="No Blueprint themes found yet."
          />
        </div>
        {products && (
          <p className="mt-6 text-center text-sm text-neutral-400">
            Showing {products.length} Blueprints | {addons.length} addons |{" "}
            {themes.length} themes
          </p>
        )}
      </div>
    </section>
  );
}
function ProductGrid({
  products,
  loading,
  emptyMessage,
}: {
  products: BlueprintProduct[];
  loading: boolean;
  emptyMessage: string;
}) {
  return (
    <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {loading && skeleton}
      {!loading && products.length === 0 && (
        <p className="col-span-full text-center text-neutral-400">
          {emptyMessage}
        </p>
      )}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
function ProductCard({ product }: { product: BlueprintProduct }) {
  const banner =
    product.banner ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=3b82f6&color=fff&size=600x320`;
  const links = [
    [product.blueprintUrl, "View on Blueprint"],
    [product.githubUrl, "View on GitHub"],
    [product.builtByBitUrl, "BuiltByBit"],
    [product.sourceXchangeUrl, "SourceXchange"],
  ] as const;
  return (
    <article className="glass card-hover rounded-lg border border-neutral-800 p-4 text-left shadow sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-neutral-100 sm:text-xl">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
            {product.summary}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-blue-500/20 bg-blue-500/15 px-2 py-1 text-xs text-blue-300">
          {product.type === "theme" ? "Theme" : "Addon"}
        </span>
      </div>
      <img
        src={banner}
        alt={product.name}
        className="mt-4 h-32 w-full rounded-lg border border-neutral-800/70 object-cover"
        loading="lazy"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.name)}&background=3b82f6&color=fff&size=600x320`;
        }}
      />
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-400">
        <span className="inline-flex items-center gap-1">
          <Tag aria-hidden="true" className="size-3.5 shrink-0" />
          {product.priceLabel}
        </span>
        <span className="inline-flex items-center gap-1">
          <Server aria-hidden="true" className="size-3.5 shrink-0" />
          {product.panels.toLocaleString()} active panels
        </span>
        {product.githubStars !== null && (
          <span className="inline-flex items-center gap-1">
            <Star aria-hidden="true" className="size-3.5 shrink-0" />
            {product.githubStars.toLocaleString()} stars
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map(
          ([href, label]) =>
            href && (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm font-semibold text-neutral-100 hover:bg-neutral-700"
              >
                {label}
                <ExternalLink aria-hidden="true" className="size-4 shrink-0" />
              </a>
            ),
        )}
      </div>
    </article>
  );
}
function WebApps({ apps }: { apps: WebApp[] | null }) {
  return (
    <section id="apps" className="bg-neutral-900 px-4 py-12">
      <div className="mx-auto max-w-6xl text-center">
        <SectionTitle title="Web Apps" icon={AppWindow} />
        <div className="mt-8 grid grid-cols-1 gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
          {apps === null && skeleton}
          {apps?.length === 0 && (
            <p className="col-span-full text-center text-neutral-400">
              Unable to load web apps at this time.
            </p>
          )}
          {apps?.map((app) => (
            <article
              key={app.name}
              className="glass card-hover rounded-lg border border-neutral-800 p-4 shadow sm:p-6"
            >
              <h3 className="text-lg font-semibold text-neutral-100">
                {app.name}
              </h3>
              <p className="mt-2 text-sm text-neutral-400">{app.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-400">
                {app.paid && <span>Paid</span>}
                {app.meta && (
                  <>
                    <span>{app.meta.language ?? "Unknown"}</span>
                    <span className="inline-flex items-center gap-1">
                      <Star aria-hidden="true" className="size-3.5 shrink-0" />
                      {app.meta.stars.toLocaleString()} stars
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork
                        aria-hidden="true"
                        className="size-3.5 shrink-0"
                      />
                      {app.meta.forks.toLocaleString()} forks
                    </span>
                    {app.meta.updated && (
                      <span>Updated {app.meta.updated}</span>
                    )}
                  </>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {app.links.map(({ label, href }, index) => (
                  <a
                    key={href}
                    className={
                      index === 0
                        ? "inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                        : "inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm font-semibold text-neutral-100 hover:bg-neutral-700"
                    }
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                    <ExternalLink
                      aria-hidden="true"
                      className="size-4 shrink-0"
                    />
                  </a>
                ))}
                {app.repository && (
                  <a
                    className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm font-semibold text-neutral-100 hover:bg-neutral-700"
                    href={`https://github.com/${app.repository}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                    <CodeXml aria-hidden="true" className="size-4 shrink-0" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
