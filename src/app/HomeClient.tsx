"use client";

import {
  Activity,
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Check,
  CodeXml,
  Folder,
  GitFork,
  Heart,
  Layers,
  Menu,
  MessageCircle,
  Palette,
  Puzzle,
  Server,
  ShieldCheck,
  Star,
  Tag,
  Terminal,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchContributors, type Contributor } from "@/utils/contributors";
import { fetchDonators, type Donator } from "@/utils/donators";
import {
  enrichBlueprintProducts,
  fetchBlueprintProducts,
  type BlueprintProduct,
} from "@/utils/products";
import { flagshipProjectCount, projects } from "@/utils/projects";
import { fetchSiteStats, type SiteStats } from "@/utils/stats";
import { fetchTeam, type TeamMember } from "@/utils/team";
import {
  fetchWebApps,
  initialWebApps,
  webAppProjectCount,
  type WebApp,
} from "@/utils/web-apps";

const navigation = [
  ["#projects", "Projects"],
  ["#products", "Blueprints"],
  ["#apps", "Web Apps"],
  ["#team", "Our people"],
  ["/docs", "Documentation"],
] as const;

export function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationRef = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [contributors, setContributors] = useState<Contributor[] | null>(null);
  const [team, setTeam] = useState<TeamMember[] | null>(null);
  const [donators, setDonators] = useState<Donator[] | null>(null);
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [products, setProducts] = useState<BlueprintProduct[] | null>(null);
  const [webApps, setWebApps] = useState<WebApp[]>(initialWebApps);
  const [statsLoading, setStatsLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    document.body.classList.add(
      "min-h-screen",
      "bg-neutral-950",
      "text-neutral-100",
    );
    void fetchContributors()
      .then((value) => {
        if (active) setContributors(value);
      })
      .catch(() => {
        if (active) setContributors([]);
      });
    void fetchTeam()
      .then((value) => {
        if (active) setTeam(value);
      })
      .catch(() => {
        if (active) setTeam([]);
      });
    void fetchDonators()
      .then((value) => {
        if (active) setDonators(value);
      })
      .catch(() => {
        if (active) setDonators([]);
      });
    void fetchWebApps().then((value) => {
      if (active) setWebApps(value);
    });
    return () => {
      active = false;
      document.body.classList.remove(
        "min-h-screen",
        "bg-neutral-950",
        "text-neutral-100",
      );
    };
  }, []);

  useEffect(() => {
    let active = true;
    void fetchSiteStats()
      .then((value) => {
        if (active) setStats(value);
      })
      .catch(() => {
        if (active) setStats(null);
      })
      .finally(() => {
        if (active) setStatsLoading(false);
      });
    void fetchBlueprintProducts()
      .then(async (catalogue) => {
        if (!active) return;
        setProducts(catalogue);
        const enriched = await enrichBlueprintProducts(catalogue);
        if (active) setProducts(enriched);
      })
      .catch(() => {
        if (active) setProductsError(true);
      });
    return () => {
      active = false;
    };
  }, [attempt]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target as Node)
      )
        setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);
  function retryCatalogue() {
    setProductsError(false);
    setStatsLoading(true);
    setAttempt((value) => value + 1);
  }

  return (
    <div className="home-site">
      <a href="#hero" className="home-skip-link">
        Skip to content
      </a>
      <header className="home-header" ref={navigationRef}>
        <nav className="home-container home-nav" aria-label="Primary">
          <Link
            href="/"
            className="home-brand"
            aria-label="Euphoria Development home"
          >
            <Image src="/images/euphoria.png" alt="" width={36} height={36} />
            <span>
              Euphoria<span className="brand-subtitle">Development</span>
            </span>
          </Link>
          <div className="desktop-navigation">
            {navigation.map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
          <Outbound
            href="https://github.com/EuphoriaDevelopmentOrg"
            className="header-github"
          >
            <CodeXml size={17} aria-hidden="true" />
            GitHub
          </Outbound>
          <button
            ref={menuButton}
            type="button"
            className="home-menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={19} aria-hidden="true" />
            ) : (
              <Menu size={19} aria-hidden="true" />
            )}
            {menuOpen ? "Close" : "Menu"}
          </button>
          {menuOpen && (
            <div id="mobile-navigation" className="home-mobile-navigation">
              {navigation.map(([href, label]) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              ))}
              <Outbound href="https://github.com/EuphoriaDevelopmentOrg">
                GitHub
              </Outbound>
            </div>
          )}
        </nav>
      </header>
      <main id="hero">
        <section className="home-hero">
          <div className="home-container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-mark" />
                Tools for game server communities
              </p>
              <h1>
                Software for the people <span>behind the servers.</span>
              </h1>
              <p className="hero-description">
                From Aquadactyl and Manta to Blueprint extensions and web apps.
                We build practical tools that give you more control over the
                communities you run.
              </p>
              <div className="hero-actions">
                <a href="#projects" className="home-button primary-button">
                  Explore our projects
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
                <Link href="/docs" className="home-button secondary-button">
                  <BookOpen size={17} aria-hidden="true" />
                  Documentation
                </Link>
              </div>
              <div className="hero-principles">
                <span>
                  <Server size={15} aria-hidden="true" />
                  Self-hosted tools
                </span>
                <span>
                  <CodeXml size={15} aria-hidden="true" />
                  Open-source projects
                </span>
                <span>
                  <Puzzle size={15} aria-hidden="true" />
                  Blueprint extensions
                </span>
              </div>
            </div>
            <WorkspacePreview />
          </div>
        </section>
        <FeaturedProjects />
        <Stats
          stats={stats}
          loading={statsLoading}
          projectCount={
            products
              ? products.length + webAppProjectCount + flagshipProjectCount
              : null
          }
        />
        <Products
          products={products}
          error={productsError}
          onRetry={retryCatalogue}
        />
        <WebApps apps={webApps} />
        <section
          className="home-section home-community"
          aria-labelledby="community-heading"
        >
          <div className="home-container">
            <SectionHeading
              eyebrow="People make the difference"
              title="Built together."
              description="The team, contributors and supporters behind Euphoria Development."
              id="community-heading"
            />
            <PeopleSection id="team" title="Team" people={team} kind="team" />
            <PeopleSection
              id="contributors"
              title="Contributors"
              people={contributors}
              kind="contributor"
            />
            <PeopleSection
              id="donators"
              title="Donators"
              people={donators}
              kind="donator"
            />
          </div>
        </section>
        <GetInvolved />
      </main>
      <footer className="home-footer">
        <div className="home-container footer-layout">
          <Link href="/" className="home-brand">
            <Image src="/images/euphoria.png" alt="" width={30} height={30} />
            <span>
              Euphoria<span className="brand-subtitle">Development</span>
            </span>
          </Link>
          <p>Practical software. Built with community.</p>
          <a href="#hero">
            Back to top
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="home-container footer-bottom">
          <p>© 2026 Euphoria Development. All rights reserved.</p>
          <nav aria-label="Footer">
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
            <Link href="/legal/refund-policy">Refund Policy</Link>
            <Link href="/legal/terms-and-conditions">
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function Outbound({
  href,
  className = "text-link",
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}

function WorkspacePreview() {
  return (
    <div className="hero-preview">
      <div
        className="workspace-preview"
        aria-label="Illustrative Aquadactyl interface"
      >
        <div className="preview-titlebar">
          <span>
            <Image
              src="/brand/aquadactyl-emblem.png"
              alt=""
              width={24}
              height={24}
            />
            Aquadactyl
          </span>
          <span className="preview-label">Interface preview</span>
        </div>
        <div className="preview-body">
          <div className="preview-sidebar" aria-hidden="true">
            <Server />
            <Folder />
            <Terminal />
            <ShieldCheck />
          </div>
          <div className="preview-content">
            <div className="preview-heading">
              <span>
                Your servers<small>One place to manage your community.</small>
              </span>
              <span className="preview-avatar">ED</span>
            </div>
            {[
              {
                name: "Community Survival",
                detail: "Minecraft · Your community",
                status: "Running",
                active: true,
              },
              {
                name: "Creative World",
                detail: "Minecraft · Build something new",
                status: "Running",
                active: true,
              },
              {
                name: "Development",
                detail: "A space to try your next idea",
                status: "Offline",
                active: false,
              },
            ].map((server) => (
              <div key={server.name} className="preview-server">
                <span className="preview-server-icon">
                  <Server size={18} aria-hidden="true" />
                </span>
                <span className="preview-server-name">
                  {server.name}
                  <small>{server.detail}</small>
                </span>
                <span
                  className={`preview-status ${server.active ? "is-running" : ""}`}
                >
                  <i />
                  {server.status}
                </span>
              </div>
            ))}
            <div className="preview-console">
              <span>
                <Terminal size={13} aria-hidden="true" />
                Console
              </span>
              <p>
                <b>›</b> Your server is ready. Make it yours.
              </p>
              <div>
                <i />
                Type a command…
              </div>
            </div>
          </div>
        </div>
        <div className="preview-footer">
          <Puzzle size={13} aria-hidden="true" />
          Blueprint included<span>Built on Pterodactyl</span>
        </div>
      </div>
      <div className="preview-caption">
        <span>
          <Layers size={15} aria-hidden="true" />
          Aquadactyl panel + Manta daemon
        </span>
        <span>Illustrative interface · sample data</span>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description: string;
  id?: string;
}) {
  return (
    <div className="home-section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function FeaturedProjects() {
  return (
    <section id="projects" className="home-section home-projects">
      <div className="home-container">
        <SectionHeading
          eyebrow="The Euphoria ecosystem"
          title="Your infrastructure. Your way."
          description="A panel you can make your own, and the daemon that keeps your servers moving."
        />
        <div className="flagship-grid">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`flagship-card flagship-${project.id}`}
            >
              <div className="project-card-header">
                <Image
                  src={project.logo}
                  alt=""
                  width={64}
                  height={52}
                  className="project-logo"
                />
                <span className="project-availability">
                  Open source <span>·</span> Beta
                </span>
              </div>
              <p className="project-category">{project.category}</p>
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <ul className="project-features">
                {project.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="project-actions">
                <Outbound
                  href={project.href}
                  className="home-button primary-button"
                >
                  Explore {project.name}
                </Outbound>
                <Outbound href={project.docs}>Installation guide</Outbound>
              </div>
              <div className="project-card-footer">
                <Outbound href={project.repository}>
                  <CodeXml size={14} aria-hidden="true" />
                  Source code
                </Outbound>
                <Link href={project.overview}>
                  Project overview
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({
  stats,
  loading,
  projectCount,
}: {
  stats: SiteStats | null;
  loading: boolean;
  projectCount: number | null;
}) {
  const display = (value: number | null | undefined) =>
    value ?? (loading ? "Loading…" : "Unavailable");
  return (
    <section
      id="statistics"
      className="home-statistics"
      aria-label="Project and Blueprint network statistics"
    >
      <div className="home-container">
        <div className="statistics-grid">
          <Stat
            label="Total Projects"
            value={display(projectCount)}
            icon={Boxes}
          />
          <Stat
            label="API Calls"
            value={display(stats?.totalApiCalls)}
            icon={Activity}
          />
          <Stat
            label="Active Panels"
            value={display(stats?.totalInstalls)}
            icon={Server}
          />
        </div>
        <p className="statistics-note">
          Catalogue totals and Blueprint extension usage.
        </p>
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
  value: number | string;
  icon: LucideIcon;
}) {
  return (
    <div className="home-stat">
      <Icon size={21} aria-hidden="true" />
      <div>
        <strong>{value.toLocaleString()}</strong>
        <p>{label}</p>
      </div>
    </div>
  );
}

function Products({
  products,
  error,
  onRetry,
}: {
  products: BlueprintProduct[] | null;
  error: boolean;
  onRetry: () => void;
}) {
  const addons = products?.filter((product) => product.type === "addon") ?? [];
  const themes = products?.filter((product) => product.type === "theme") ?? [];
  return (
    <section id="products" className="home-section">
      <div className="home-container">
        <SectionHeading
          eyebrow="Extend the familiar"
          title="Small additions. A better panel."
          description="Blueprint-powered themes and addons for Pterodactyl. Find the right tools and appearance for your community."
        />
        {error ? (
          <div className="home-notice" role="status">
            <Puzzle size={24} aria-hidden="true" />
            <p>
              The Blueprint catalogue is unavailable right now. Please try
              again.
            </p>
            <button
              type="button"
              className="home-button secondary-button"
              onClick={onRetry}
            >
              Retry catalogue
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            <div className="catalogue-group">
              <h3>
                <Puzzle size={18} aria-hidden="true" />
                Blueprint Addons
                <span>{products === null ? "…" : addons.length}</span>
              </h3>
              <ProductGrid
                products={addons}
                loading={products === null}
                emptyMessage="No Blueprint addons found yet."
              />
            </div>
            <div className="catalogue-group">
              <h3>
                <Palette size={18} aria-hidden="true" />
                Blueprint Themes
                <span>{products === null ? "…" : themes.length}</span>
              </h3>
              <ProductGrid
                products={themes}
                loading={products === null}
                emptyMessage="No Blueprint themes found yet."
              />
            </div>
            {products && (
              <p className="catalogue-summary">
                Showing {products.length} Blueprints · {addons.length} addons ·{" "}
                {themes.length} themes
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function LoadingCard() {
  return (
    <div className="home-skeleton" role="status" aria-label="Loading catalogue">
      <span />
      <span />
      <span />
    </div>
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
    <div className="catalogue-grid">
      {loading && (
        <>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </>
      )}
      {!loading && products.length === 0 && (
        <p className="home-empty">{emptyMessage}</p>
      )}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: BlueprintProduct }) {
  const [imageFailed, setImageFailed] = useState(false);
  const links = [
    [product.blueprintUrl, "View on Blueprint"],
    [product.githubUrl, "View on GitHub"],
    [product.builtByBitUrl, "BuiltByBit"],
    [product.sourceXchangeUrl, "SourceXchange"],
  ] as const;
  const Icon = product.type === "theme" ? Palette : Puzzle;
  return (
    <article className="catalogue-card">
      <div className="product-artwork">
        {product.banner && !imageFailed ? (
          <img
            src={product.banner}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="product-artwork-fallback">
            <Icon size={32} aria-hidden="true" />
            <span>{product.name}</span>
          </div>
        )}
        <span className="product-type">
          {product.type === "theme" ? "Theme" : "Addon"}
        </span>
      </div>
      <div className="product-card-content">
        <h4>{product.name}</h4>
        <p>{product.summary}</p>
        <div className="product-meta">
          <span>
            <Tag size={13} aria-hidden="true" />
            {product.priceLabel}
          </span>
          <span>
            <Server size={13} aria-hidden="true" />
            {product.panels.toLocaleString()} active panels
          </span>
          {product.githubStars !== null && (
            <span>
              <Star size={13} aria-hidden="true" />
              {product.githubStars.toLocaleString()} stars
            </span>
          )}
        </div>
        <div className="product-links">
          {links.map(
            ([href, label]) =>
              href && (
                <Outbound key={label} href={href}>
                  {label}
                </Outbound>
              ),
          )}
        </div>
      </div>
    </article>
  );
}

function WebApps({ apps }: { apps: WebApp[] }) {
  return (
    <section id="apps" className="home-section home-apps">
      <div className="home-container">
        <SectionHeading
          eyebrow="Beyond the control panel"
          title="Useful software. Ready to explore."
          description="Share a snippet, manage your software licences or bring Minecraft profiles into your next project."
        />
        <div className="web-app-grid">
          {apps
            .filter((app) => app.status !== "moved")
            .map((app) => (
              <article key={app.name} className="web-app-card">
                <div className="web-app-top">
                  <span className="app-icon">
                    <AppWindow size={22} aria-hidden="true" />
                  </span>
                  <span className="app-edition">
                    {app.paid ? "Commercial" : "Free"}
                  </span>
                </div>
                <h3>{app.name}</h3>
                <p className="app-description">{app.description}</p>
                {app.meta && (
                  <div className="product-meta">
                    <span>{app.meta.language ?? "Open source"}</span>
                    <span>
                      <Star size={13} aria-hidden="true" />
                      {app.meta.stars.toLocaleString()} stars
                    </span>
                    <span>
                      <GitFork size={13} aria-hidden="true" />
                      {app.meta.forks.toLocaleString()} forks
                    </span>
                  </div>
                )}
                <div className="app-links">
                  {app.links.map(({ label, href }, index) => (
                    <Outbound
                      key={href}
                      href={href}
                      className={
                        index === 0
                          ? "home-button secondary-button"
                          : "text-link"
                      }
                    >
                      {label}
                    </Outbound>
                  ))}
                  {app.repository && (
                    <Outbound href={`https://github.com/${app.repository}`}>
                      <CodeXml size={14} aria-hidden="true" />
                      GitHub
                    </Outbound>
                  )}
                </div>
              </article>
            ))}
        </div>
        <p className="migration-note">
          Looking for Crafatar? It has moved to{" "}
          <Outbound href="https://nitrocraft.uk">NitroCraft</Outbound>.{" "}
          <Link href="/docs/community/crafatar-api">
            Read the migration notes
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}

function PeopleSection({
  id,
  title,
  people,
  kind,
}: {
  id: string;
  title: string;
  people: (Contributor | Donator | TeamMember)[] | null;
  kind: "contributor" | "donator" | "team";
}) {
  return (
    <section id={id} className="people-section">
      <div className="people-heading">
        <Users size={18} aria-hidden="true" />
        <h3>{title}</h3>
      </div>
      <div className="people-grid">
        {people === null && <LoadingCard />}
        {people?.length === 0 && (
          <p className="home-empty">
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
    </section>
  );
}

function PersonCard({
  person,
  kind,
}: {
  person: Contributor | Donator | TeamMember;
  kind: "contributor" | "donator" | "team";
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const content = (
    <>
      <div className="person-avatar">
        {person.image && !imageFailed ? (
          <img
            src={person.image}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span>{person.name.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      <div className="person-details">
        <h4>{person.name}</h4>
        <p>
          {kind === "contributor"
            ? (person as Contributor).contribution || "Contributor"
            : kind === "team"
              ? (person as TeamMember).role || "Team Member"
              : "Thank you for supporting our work."}
        </p>
        <span className="person-role">
          {kind === "team"
            ? "Team Member"
            : kind === "contributor"
              ? "Contributor"
              : (person as Donator).donation || "Supporter"}
        </span>
      </div>
      {person.link && (
        <ArrowUpRight size={15} className="person-arrow" aria-hidden="true" />
      )}
    </>
  );
  return person.link ? (
    <a
      className="person-card"
      href={person.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <article className="person-card">{content}</article>
  );
}

function GetInvolved() {
  return (
    <section id="get-involved" className="home-section home-involvement">
      <div className="home-container involvement-layout">
        <div>
          <p className="eyebrow">Keep building with us</p>
          <h2>
            Your next idea
            <br />
            could start here.
          </h2>
          <p>
            Explore the code, ask a question or help shape what comes next.
            There’s a place for you in the Euphoria community.
          </p>
        </div>
        <div className="community-links">
          {[
            {
              name: "Explore the code",
              text: "Find our projects on GitHub.",
              href: "https://github.com/EuphoriaDevelopmentOrg",
              Icon: CodeXml,
            },
            {
              name: "Join the conversation",
              text: "Get help and share ideas on Discord.",
              href: "https://discord.euphoriadevelopment.uk",
              Icon: MessageCircle,
            },
            {
              name: "Support development",
              text: "Help keep community projects moving.",
              href: "https://github.com/sponsors/RepGraphics",
              Icon: Heart,
            },
          ].map(({ name, text, href, Icon }) => (
            <a key={name} href={href} target="_blank" rel="noopener noreferrer">
              <Icon size={21} aria-hidden="true" />
              <span>
                <strong>{name}</strong>
                <small>{text}</small>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
