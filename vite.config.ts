import { defineConfig } from "vite-plus"

const ignorePatterns = ["CHANGELOG.md", "**/public/profiles/**"]

export default defineConfig({
  fmt: {
    semi: false,
    printWidth: 80,
    arrowParens: "avoid",
    ignorePatterns,
  },
  lint: {
    ignorePatterns,
    options: {
      typeAware: false,
      typeCheck: false,
    },
  },
})
