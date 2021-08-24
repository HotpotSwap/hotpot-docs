const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Hotpot',
  tagline: 'Hotpot Documentation and Guides',
  url: 'https://docs.hotpot.cool/',
  baseUrl: '/',
  trailingSlash: false,
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'hotpot', // Usually your GitHub org/user name.
  projectName: 'hotpot-doc', // Usually your repo name.
  i18n: { defaultLocale: 'en', locales: ['en', 'zh-cn'], },
  themeConfig: {
    // announcementBar: {
    //   id: 'support_us', // 用于辨别此消息的值。
    //   content: '我们想进一步改善文档，请帮忙填写一下<a target="_blank" rel="noopener noreferrer" href="#">此问卷</a>',
    //   backgroundColor: '#fafbfc', // 默认为 `#fff`.
    //   textColor: '#091E42', // 默认为 `#000`.
    //   isCloseable: false, // 默认为 `true`.
    // },
    prism: {
      additionalLanguages: ["solidity"],
    },
    navbar: {
      hideOnScroll: false,
      title: 'Hotpot Docs',
      logo: {
        alt: 'hotpot Logo',
        src: 'img/logo.svg',
      },
      items: [
        // { type: 'search', position: 'right', },
        {
          to: '/protocol/tutorial/introduction',
          position: 'left',
          label: 'Tutorial',
          className: "persistent",

        },
        {
          to: "/protocol/reference/hotpot-protocol",
          position: 'left',
          label: 'Contracts',
          className: "persistent",
        },
        // { type: 'blog', label: 'Announcement', position: 'left' },
        {
          href: 'https://github.com/hotpotswap/hotpot-docs',
          label: 'GitHub',
          position: 'right',
          className: "persistent",
        },
        {
          type: "localeDropdown",
          //// Optional
          position: "right",
          className: "persistent",
          // Add additional dropdown items at the beginning/end of the dropdown.
          dropdownItemsBefore: [],
          dropdownItemsAfter: [
            // {
            //   to: "https://my-site.com/help-us-translate",
            //   label: "Help us translate",
            // },
          ],
        },
      ],
    },
    footer: {
      // style: 'dark',
      links: [
        {
          title: "Developers",
          items: [
            {
              label: "Bug Bounty",
              href: "https://hotpot.cool/",
            },
            {
              label: "#dev-chat",
              href: "https://hotpot.cool/",
            },
            {
              label: "Github",
              href: "https://github.com/HotpotSwap"
            }
          ],
        },
        {
          title: "Ecosystem",
          items: [
            {
              label: "Home",
              href: "https://hotpot.cool/",
            },
            {
              label: "App",
              href: "https://app.hotpot.cool/",
            },
            {
              label: "Analytics",
              href: "https://hotpot.cool/",
            },
            // {
            //   label: "Brand Assets",
            //   href: "https://hotpot.cool/Hotpot_brand_assets.zip",
            // },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Governance",
              href: "https://discuss.01.finance/t/hotpot/",
            },
            {
              label: "Telegram",
              href: "https://t.me/hotpot01/",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/hotpot01/",
            },
          ],
        },
      ],
      // copyright: `unlicensed`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: "dark",

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: false,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: true,

      // Dark/light switch icon options
      switchConfig: {
        // Icon for the switch while in dark mode
        darkIcon: "\u{263D}",

        // Unicode icons such as '\u2600' will work
        // Unicode with 5 chars require brackets: '\u{1F602}'
        lightIcon: "\u{263C}",
      },
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: "protocol/",
          sidebarPath: require.resolve("./sidebars.js"),
          // includeCurrentVersion: false,
          // disableVersioning: true,
          editUrl: 'https://github.com/hotpotswap/doc.hotpot.cool/edit/main/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
          customCss2: require.resolve("./src/css/colors.css"),
        },
      },
    ],
    [

      '@docusaurus/plugin-content-pages',
      {
        /**
         * Path to data on filesystem
         * relative to site dir
         * components in this directory will be automatically converted to pages
         */
        path: 'src/pages',
        /**
         * URL route for the page section of your site
         * do not include trailing slash
         */
        routeBasePath: './',
        include: ['**/*.{js,jsx,ts,tsx,md,mdx}'],
        /**
         * No route will be created for matching files
         */
        exclude: [
          '**/_*.{js,jsx,ts,tsx,md,mdx}',
          '**/_*/**',
          '**/*.test.{js,jsx,ts,tsx}',
          '**/__tests__/**',
        ],
        /**
         * Theme component used by markdown pages.
         */
        mdxPageComponent: '@theme/MDXPage',
        /**
         * 传递至 MDX 的 Remark 及 Rehype 插件。
         */
        remarkPlugins: [],
        rehypePlugins: [],
        /**
         * 于 Docusaurus 自带的默认 Remark 及 Rehype 插件前
         * 传递至 MDX 的自定义 Remark 及 Rehype 插件。
         */
        beforeDefaultRemarkPlugins: [],
        beforeDefaultRehypePlugins: [],
      }
    ]
  ],
};