export const siteOrigin = "https://euphoriadevelopment.uk";

export type SitePage = { path: string; title: string; description: string };
type DocGroup = { id: string; title: string; pages: SitePage[] };

export const docGroups: DocGroup[] = [
  {
    id: "general-guides",
    title: "General Guides",
    pages: [
      {
        path: "/docs/general-guides/licensing",
        title: "Licensing",
        description:
          "Get, activate, and reset license keys for Euphoria Development resources purchased through supported stores.",
      },
      {
        path: "/docs/general-guides/licensed-resources",
        title: "Licensed Resources",
        description:
          "Understand license requirements and validation for Euphoria Development themes and extensions.",
      },
      {
        path: "/docs/general-guides/site-and-api",
        title: "Site and API",
        description:
          "Find Euphoria Development websites, APIs, and service information for your integrations.",
      },
      {
        path: "/docs/general-guides/installation",
        title: "Installation",
        description:
          "Install Euphoria Development Blueprint themes and extensions on your Pterodactyl Panel.",
      },
      {
        path: "/docs/general-guides/uninstalling",
        title: "Uninstalling",
        description:
          "Remove Euphoria Development Blueprint extensions and themes from your Pterodactyl Panel.",
      },
    ],
  },
  {
    id: "theme-and-api",
    title: "Theme & API",
    pages: [
      {
        path: "/docs/euphoria-theme/theme-customiser",
        title: "Theme Customiser",
        description:
          "Customise your Euphoria Theme appearance, navigation, backgrounds, and panel settings.",
      },
      {
        path: "/docs/game-api/setup-guide",
        title: "Game API Setup Guide",
        description:
          "Configure the Game API integration for Euphoria Development panel extensions.",
      },
    ],
  },
  {
    id: "setup",
    title: "Setup",
    pages: [
      {
        path: "/docs/setup/player-listing",
        title: "Player Listing",
        description:
          "Set up the Player Listing extension and display player information in your Pterodactyl Panel.",
      },
      {
        path: "/docs/setup/refresh-theme",
        title: "Refresh Theme Setup",
        description:
          "Install and configure Refresh Theme for your Pterodactyl Panel using Blueprint.",
      },
      {
        path: "/docs/setup/mc-logs",
        title: "MC Logs",
        description:
          "Configure the MC Logs extension to share and troubleshoot Minecraft server logs.",
      },
      {
        path: "/docs/setup/server-backgrounds",
        title: "Server Backgrounds",
        description:
          "Configure custom server backgrounds for your Pterodactyl Panel.",
      },
      {
        path: "/docs/setup/translations",
        title: "Translations",
        description:
          "Set up translations and language options for your Pterodactyl Panel extensions.",
      },
      {
        path: "/docs/setup/resource-alerts",
        title: "Resource Alerts",
        description:
          "Configure resource usage alerts for servers in your Pterodactyl Panel.",
      },
    ],
  },
  {
    id: "community",
    title: "Community",
    pages: [
      {
        path: "/docs/community/web-apps",
        title: "Web Apps",
        description:
          "Explore free and paid Euphoria Paste editions, Euphoria Licensing, and NitroCraft, with demo and purchase links.",
      },
      {
        path: "/docs/community/euphoria-licensing",
        title: "Euphoria Licensing",
        description:
          "Explore Euphoria Licensing for product validation and license management, with demo and marketplace links.",
      },
      {
        path: "/docs/community/crafatar-api",
        title: "Crafatar API (Moved to NitroCraft)",
        description:
          "Crafatar has moved to NitroCraft. Find migration information and legacy Minecraft avatar API documentation.",
      },
      {
        path: "/docs/community/crafatar-setup",
        title: "Crafatar Setup (Moved to NitroCraft)",
        description:
          "Read the legacy Crafatar setup guide and find NitroCraft, its new home for Minecraft avatars and renders.",
      },
      {
        path: "/docs/community/nitrocraft-api",
        title: "NitroCraft API",
        description:
          "Use the NitroCraft API to deliver Minecraft avatars, skins, capes, and renders.",
      },
      {
        path: "/docs/community/nitrocraft-setup",
        title: "NitroCraft Setup",
        description:
          "Set up NitroCraft for Minecraft profile assets and rendering.",
      },
      {
        path: "/docs/community/blueprint-addons",
        title: "Blueprint Addons",
        description:
          "Explore Euphoria Development community Blueprint addons and their GitHub repositories.",
      },
      {
        path: "/docs/community/refresh-theme",
        title: "Refresh Theme Community Project",
        description:
          "Find the Refresh Theme community repository, project information, and installation guide.",
      },
    ],
  },
  {
    id: "legal-and-terms",
    title: "Legal & Terms",
    pages: [
      {
        path: "/docs/legal-and-terms/terms-and-conditions",
        title: "Resource Terms & Conditions",
        description:
          "Read the documentation terms for using Euphoria Development resources and find the full site policies.",
      },
    ],
  },
];

export const legalPages: SitePage[] = [
  {
    path: "/legal/privacy-policy",
    title: "Privacy Policy",
    description:
      "Read how Euphoria Development collects, uses, and protects personal information.",
  },
  {
    path: "/legal/refund-policy",
    title: "Refund Policy",
    description:
      "Read Euphoria Development's refund policy for digital products and services.",
  },
  {
    path: "/legal/terms-and-conditions",
    title: "Terms & Conditions",
    description:
      "Read the terms and conditions for Euphoria Development websites, products, and services.",
  },
];

export const sitePages: SitePage[] = [
  {
    path: "/",
    title: "Euphoria Development | Blueprints & Web Apps",
    description:
      "Blueprint-powered themes and extensions for Pterodactyl Panel, plus web apps and APIs from Euphoria Development.",
  },
  {
    path: "/docs",
    title: "Documentation",
    description:
      "Guides for Euphoria Development themes, Blueprint addons, web apps, APIs, installation, and licensing.",
  },
  ...docGroups.flatMap((group) => group.pages),
  ...legalPages,
];

export const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";
export const findPage = (path: string) =>
  sitePages.find((page) => page.path === normalizePath(path)) ?? sitePages[0];
export const pageTitle = (page: SitePage) =>
  page.path === "/" ? page.title : `${page.title} | Euphoria Development`;
