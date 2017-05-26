import fs from 'fs'
import path from 'path'
import listFns from './_lib/listFns'
import listFPFns from './_lib/listFPFns'
import listLocales from './_lib/listLocales'

const generatedAutomaticallyMessage = '// This file is generated automatically by `scripts/buildIndex.js`. Please, don\'t change it.'

function generateIndex (files) {
  const propertyRequireLines = files
    .map((fn) => `  ${fn.name}: require('${fn.path.replace(/\.js$/, '')}/index.js')`)

  const indexLines = [generatedAutomaticallyMessage]
    .concat('')
    .concat('module.exports = {')
    .concat(propertyRequireLines.join(',\n'))
    .concat('}')
    .join('\n')

  return `${indexLines}\n`
}

function generateESMIndex (files) {
  const fileLines = files
    .map(fn => `export {default as ${fn.name}} from '${fn.path.replace(/\.js$/, '')}/index.js'`)

  const indexLines = [generatedAutomaticallyMessage]
    .concat('')
    .concat(fileLines)
    .join('\n')

  return `${indexLines}\n`
}

const fns = listFns()
const fpFns = listFPFns()
const locales = listLocales()

fs.writeFileSync(path.join(process.cwd(), 'src', 'index.js'), generateIndex(fns))
fs.writeFileSync(path.join(process.cwd(), 'src', 'fp', 'index.js'), generateIndex(fpFns))
fs.writeFileSync(path.join(process.cwd(), 'src', 'locale', 'index.js'), generateIndex(locales))
fs.writeFileSync(path.join(process.cwd(), 'src', 'esm', 'index.js'), generateESMIndex(fns))
fs.writeFileSync(path.join(process.cwd(), 'src', 'esm', 'fp', 'index.js'), generateESMIndex(fpFns))
fs.writeFileSync(path.join(process.cwd(), 'src', 'esm', 'locale', 'index.js'), generateESMIndex(locales))
