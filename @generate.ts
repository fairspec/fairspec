import { execa } from "execa"
import { replaceInFile } from "replace-in-file"
import tasuku from "tasuku"
import packageJson from "./package.json" with { type: "json" }

process.chdir(import.meta.dirname)
const version = packageJson.version
const $ = execa({ stdout: ["inherit"], preferLocal: true })

await tasuku("Copying profiles", async () => {
  await $`rm -rf public/profiles/latest`
  await $`rm -rf public/profiles/${version}`
  await $`cp -r profiles public/profiles/latest`
  await $`cp -r profiles public/profiles/${version}`
})

await tasuku("Updating references in current", async () => {
  await replaceInFile({
    files: `public/profiles/${version}/dataset.json`,
    from: /{file-dialect-ref}/g,
    to: `https://fairspec.org/profiles/${version}/file-dialect.json`,
  })

  await replaceInFile({
    files: `public/profiles/${version}/dataset.json`,
    from: /{data-schema-ref}/g,
    to: `https://fairspec.org/profiles/${version}/data-schema.json`,
  })

  await replaceInFile({
    files: `public/profiles/${version}/dataset.json`,
    from: /{table-schema-ref}/g,
    to: `https://fairspec.org/profiles/${version}/table-schema.json`,
  })
})

await tasuku("Updating references in latest", async () => {
  await replaceInFile({
    files: `public/profiles/latest/dataset.json`,
    from: /{file-dialect-ref}/g,
    to: `https://fairspec.org/profiles/latest/file-dialect.json`,
  })

  await replaceInFile({
    files: `public/profiles/latest/dataset.json`,
    from: /{data-schema-ref}/g,
    to: `https://fairspec.org/profiles/latest/data-schema.json`,
  })

  await replaceInFile({
    files: `public/profiles/latest/dataset.json`,
    from: /{table-schema-ref}/g,
    to: `https://fairspec.org/profiles/latest/table-schema.json`,
  })
})
