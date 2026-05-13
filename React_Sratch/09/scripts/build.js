import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { teas } from '../src/data.js'
import App from '../src/App.js'
import ReactDOMServer from 'react-dom/server'
import React from 'react'

// GET __dirname

const __filename = fileURLToPath(import.meta.url)
console.log(__filename);
const __dirname = path.dirname(__filename)
console.log(__dirname);

// Define output path

const outputPath = path.join(__dirname, "../dist")
const htmlTemplatePath = path.join(__dirname, '../src/template.html')
const outputHtmlPath = path.join(outputPath, 'index.html')

const template = fs.readFileSync(htmlTemplatePath, 'utf-8')

const appHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(App, { teas }))

const finalHtml = template.replace('<!--app-->', appHtml)

//write output file
fs.emptyDirSync(outputPath)
fs.writeFileSync(outputHtmlPath, finalHtml, 'utf-8')

console.log("Build completed. Output written to dist/index.html")
