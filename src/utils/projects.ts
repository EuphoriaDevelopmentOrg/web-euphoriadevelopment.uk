// Flagship projects remain available when the catalogue or GitHub API is offline.
export const aquadactylDemoUrl = "https://demo.aquadactyl.uk";

export const projects = [
  {
    id: "aquadactyl",
    name: "Aquadactyl",
    category: "Game server panel",
    description:
      "A familiar home for your game servers, with more room to make it yours. Built on Pterodactyl with Blueprint included.",
    logo: "/brand/aquadactyl-emblem.png",
    features: [
      "Blueprint built in",
      "Passkeys & connected accounts",
      "Custom branding & appearance",
      "Personal server folders",
    ],
    href: "https://aquadactyl.uk/",
    demo: aquadactylDemoUrl,
    docs: "https://aquadactyl.uk/docs/panel/installing-the-panel",
    repository: "https://github.com/Aquadactyl/aquadactyl",
    overview: "/docs/community/aquadactyl",
  },
  {
    id: "manta",
    name: "Manta",
    category: "Server daemon",
    description:
      "The engine behind your servers. A Wings-compatible daemon for managing containers, files and backups on your own infrastructure.",
    logo: "/brand/manta-logo.png",
    features: [
      "Wings-compatible APIs",
      "Docker server management",
      "Files, backups & SFTP",
      "Linux + macOS development",
    ],
    href: "https://aquadactyl.uk/docs/manta",
    docs: "https://aquadactyl.uk/docs/manta/installing-manta",
    repository: "https://github.com/Aquadactyl/manta",
    overview: "/docs/community/manta",
  },
] as const;

export const flagshipProjectCount = projects.length;
