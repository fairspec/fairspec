import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"
import starlightChangelogs, {
  makeChangelogsSidebarLinks,
} from "starlight-changelogs"
import starlightGitHubAlerts from "starlight-github-alerts"
import starlightScrollToTop from "starlight-scroll-to-top"
import metadata from "./package.json" with { type: "json" }

const { origin, hostname, pathname } = new URL(metadata.homepage)
const basedir = import.meta.env.PROD ? pathname : ""

export default defineConfig({
  site: origin,
  base: basedir,
  srcDir: ".",
  outDir: "build",
  integrations: [
    starlight({
      title: metadata.title,
      description: metadata.description,
      customCss: ["/styles/general.css"],
      components: {
        SocialIcons: "./components/SocialIcons.astro",
      },
      logo: {
        src: "/assets/fairspec-logo.svg",
        alt: "Fairspec",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: metadata.repository,
        },
      ],
      favicon: "favicon.svg",
      editLink: {
        baseUrl: `${metadata.repository}/edit/main`,
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
        {
          label: "Specification",
          items: [
            { label: "Metadata", slug: "specification/metadata" },
            {
              label: "Data",
              autogenerate: { directory: "specification/data" },
            },
          ],
        },
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
})
