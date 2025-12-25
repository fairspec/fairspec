import { rehypeHeadingIds } from "@astrojs/markdown-remark"
import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"
import { remarkHeadingId } from "remark-custom-heading-id"
import starlightChangelogs, {
  makeChangelogsSidebarLinks,
} from "starlight-changelogs"
import starlightGitHubAlerts from "starlight-github-alerts"
import starlightScrollToTop from "starlight-scroll-to-top"
import packageJson from "./package.json" with { type: "json" }

const { origin, hostname, pathname } = new URL(packageJson.homepage)
const basedir = import.meta.env.PROD ? pathname : ""

export default defineConfig({
  site: origin,
  base: basedir,
  srcDir: ".",
  outDir: "build",
  integrations: [
    starlight({
      title: packageJson.title,
      description: packageJson.description,
      customCss: ["/styles/general.css"],
      components: {
        SocialIcons: "./components/Builtin/SocialIcons.astro",
      },
      logo: {
        src: "/assets/fairspec-logo.svg",
        alt: "Fairspec",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: packageJson.repository,
        },
      ],
      favicon: "fairspec-logo.png",
      editLink: {
        baseUrl: `${packageJson.repository}/edit/main`,
      },
      lastUpdated: true,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 5 },
      plugins: [
        starlightGitHubAlerts(),
        starlightScrollToTop(),
        starlightChangelogs(),
      ],
      expressiveCode: {
        themes: ["starlight-dark", "starlight-light"],
      },
      sidebar: [
        { label: "Overview", autogenerate: { directory: "overview" } },
        { label: "Specifications", autogenerate: { directory: "specs" } },
        {
          label: "Changelog",
          collapsed: true,
          items: makeChangelogsSidebarLinks([
            {
              type: "recent",
              base: "changelog",
              count: 10,
            },
          ]),
        },
      ],
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://plausible.io/js/script.js",
            "data-domain": hostname,
            defer: true,
          },
        },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkHeadingId],
    rehypePlugins: [rehypeHeadingIds],
  },
})
