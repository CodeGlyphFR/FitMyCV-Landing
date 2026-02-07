import { buildSync } from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, 'src');
const outDir = __dirname;

// Step 1: Bundle JS
console.log('Bundling JS...');

buildSync({
  entryPoints: [join(srcDir, 'index.js')],
  bundle: true,
  format: 'iife',
  outfile: join(outDir, 'index.bundle.js'),
  minify: false,
});

buildSync({
  entryPoints: [join(srcDir, 'step-index.js')],
  bundle: true,
  format: 'iife',
  outfile: join(outDir, 'step-index.bundle.js'),
  minify: false,
});

console.log('  -> index.bundle.js');
console.log('  -> step-index.bundle.js');

// Step 2: Read CSS
const variablesCss = readFileSync(join(srcDir, 'styles', 'variables.css'), 'utf-8');
const componentsCss = readFileSync(join(srcDir, 'styles', 'components.css'), 'utf-8');
const allCss = variablesCss + '\n' + componentsCss;

// Step 3: Generate HTML files with inline CSS
const htmlTemplates = [
  {
    output: 'workflow-demo.html',
    title: 'FitMyCV - Workflow Demo',
    body: '<div id="app"></div>',
    script: 'index.bundle.js',
  },
  { output: 'step1.html', title: 'FitMyCV - Import PDF', body: '<div id="app" data-step="1"></div>', script: 'step-index.bundle.js' },
  { output: 'step2.html', title: 'FitMyCV - Génération', body: '<div id="app" data-step="2"></div>', script: 'step-index.bundle.js' },
  { output: 'step3.html', title: 'FitMyCV - Review', body: '<div id="app" data-step="3"></div>', script: 'step-index.bundle.js' },
  { output: 'step4.html', title: 'FitMyCV - Score', body: '<div id="app" data-step="4"></div>', script: 'step-index.bundle.js' },
  { output: 'step5.html', title: 'FitMyCV - Optimisation', body: '<div id="app" data-step="5"></div>', script: 'step-index.bundle.js' },
  { output: 'step6.html', title: 'FitMyCV - Review Optimisation', body: '<div id="app" data-step="6"></div>', script: 'step-index.bundle.js' },
  { output: 'step7.html', title: 'FitMyCV - Export', body: '<div id="app" data-step="7"></div>', script: 'step-index.bundle.js' },
];

console.log('Generating HTML files with inline CSS...');

for (const tpl of htmlTemplates) {
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${tpl.title}</title>
<style>
${allCss}
</style>
</head>
<body>
${tpl.body}
<script src="${tpl.script}"></script>
</body>
</html>
`;
  writeFileSync(join(outDir, tpl.output), html);
  console.log(`  -> ${tpl.output}`);
}

console.log('Build complete!');
