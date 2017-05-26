import path from 'path'
import fs from 'fs'

const ignoredFiles = ['index.js', 'test.js']

export default function listLocales () {
  const locales = fs.readdirSync(path.join(process.cwd(), 'src', 'locale'))
  return locales
    .filter((file) => /^[^._]/.test(file) && !ignoredFiles.includes(file))
    .map((locale) => ({
      name: locale.replace(/-/g, ''),
      code: locale,
      path: `./${locale}`,
      fullPath: `./src/locale/${locale}/index.js`
    }))
}
