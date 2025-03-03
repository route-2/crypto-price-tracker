// @ts-check

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Crypto Price Tracker Docs",
  tagline: "Live Cryptocurrency Prices Dashboard",
  favicon: "img/favicon.ico",

  // Set the production URL of your site
  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/",

  // GitHub pages deployment config
  organizationName: "route-2", 
  projectName: "crypto-price-tracker", 

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"), 
          editUrl: "https://github.com/route-2/crypto-price-tracker/tree/main/docs/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/crypto-tracker-social-card.jpg",
      navbar: {
        title: "Crypto Tracker Docs",
        logo: {
          alt: "Crypto Tracker Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar", 
            position: "left",
            label: "Docs",
          },
          {
            href: "https://github.com/route-2/crypto-price-tracker",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Project Setup",
                to: "/docs/setup",
              },
              {
                label: "API Integration",
                to: "/docs/api-integration",
              },
              {
                label: "State Management",
                to: "/docs/state-management",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "GitHub Issues",
                href: "https://github.com/route-2/crypto-price-tracker/issues",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/ruthu-rao-b28116212",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/ruthurao",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Medium",
                href: "https://medium.com/ruthurao",
              },

              {
                label: "GitHub",
                href: "https://github.com/route-2/crypto-price-tracker",
              },
              {
                label:"Mirror",
                href:"https://mirror.xyz/ruthu.eth",
              },
            ],
          },
        ],
        copyright: `Crypto-Price-Tracker: Built by Ruthu`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
