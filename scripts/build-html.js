const fs = require('fs');
const path = require('path');

try {
  const metatags = fs.readFileSync(path.resolve('./', 'public', 'dataset.json')).metatags;
  const oldHtml = fs.readFileSync(path.resolve('./', 'public', 'index.html'));
  const html = oldHtml
    .toString()
    .replace('process.env.TITLE', metatags.title)
    .replace('process.env.DESCRIPTION', metatags.description)
    .replace('process.env.URL', metatags.url)
    .replace('process.env.IMAGE', metatags.image);

  fs.writeFileSync(path.resolve('./', 'public', 'index.html'), JSON.stringify(html, null, 2));

  console.log('html generated successfully 😎');
} catch (error) {
  console.error(error);
  process.exit(1);
}
