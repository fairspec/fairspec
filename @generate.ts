import { execa } from "execa"
import { replaceInFile } from "replace-in-file"
import tasuku from "tasuku"
import packageJson from "./package.json" with { type: "json" }

process.chdir(import.meta.dirname)
const version = packageJson.version
const $ = execa({ stdout: ["inherit", "pipe"], preferLocal: true })

await tasuku("Copying profiles", async () => {
  await $`rm -rf public/profiles/latest`
  await $`rm -rf public/profiles/${version}`
  await $`cp -r profiles public/profiles/latest`
  await $`cp -r profiles public/profiles/${version}`
})

await tasuku("Updating references in current", async () => {
  await replaceInFile({
    files: `public/profiles/${version}/dataset.json`,
    from: /{fairspec-file-ref}/g,
    to: `https://fairspec.org/profiles/${version}/file.json`,
  })

  await replaceInFile({
    files: `public/profiles/${version}/dataset.json`,
    from: /{fairspec-table-ref}/g,
    to: `https://fairspec.org/profiles/${version}/table.json`,
  })
})

await tasuku("Updating references in latest", async () => {
  await replaceInFile({
    files: `public/profiles/latest/dataset.json`,
    from: /{fairspec-file-ref}/g,
    to: `https://fairspec.org/profiles/latest/file.json`,
  })

  await replaceInFile({
    files: `public/profiles/latest/dataset.json`,
    from: /{fairspec-table-ref}/g,
    to: `https://fairspec.org/profiles/latest/table.json`,
  })
})
