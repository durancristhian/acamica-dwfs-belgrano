const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');

try {
  const dataset = fs.readFileSync(path.resolve('./', 'public', 'dataset.json'));
  const metatags = JSON.parse(dataset.toString()).metatags[0];

  replace.sync({
    files: [
      path.resolve('./', 'public', 'index.html'),
      path.resolve('./', 'public', 'estudiantes.html')
    ],
    from: [
      /process.env.TITLE/g,
      /process.env.DESCRIPTION/g,
      /process.env.URL/g,
      /process.env.IMAGE/g
    ],
    to: [metatags.title, metatags.description, metatags.url, metatags.image]
  });

  console.log('HTML files generated successfully 😎');
} catch (error) {
  console.error(error);

  process.exit(1);
}
