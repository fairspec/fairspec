import { rehypeHeadingIds } from "@astrojs/markdown-remark"
import starlight from "@astrojs/starlight"
import { defineConfig } from "astro/config"
import { remarkHeadingId } from "remark-custom-heading-id"
import starlightChangelogs, {
  makeChangelogsSidebarLinks,
} from "starlight-changelogs"
import starlightGitHubAlerts from "starlight-github-alerts"
import starlightScrollToTop from "starlight-scroll-to-top"

export default defineConfig({
  site: "https://fairspec.org",
  srcDir: ".",
  outDir: "build",
  integrations: [
    starlight({
      title: "Fairspec",
      description:
        "Fairspec is a data exchange format compatible with DataCite for metadata and JSON Schema for structured data",
      customCss: ["/styles/general.css"],
      components: {
        SocialIcons: "./components/builtin/SocialIcons.astro",
      },
      logo: {
        src: "/assets/fairspec-logo.svg",
        alt: "Fairspec",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/fairspec/fairspec",
        },
      ],
      favicon: "fairspec-logo.png",
      editLink: {
        baseUrl: "https://github.com/fairspec/fairspec/edit/main",
      },
      lastUpdated: true,
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
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
        { label: "Extensions", autogenerate: { directory: "extensions" } },
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
            "data-domain": "fairspec.org",
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
