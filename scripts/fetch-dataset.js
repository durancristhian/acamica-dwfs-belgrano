const fs = require('fs');
require('isomorphic-fetch');
const gsheets = require('gsheets');
const path = require('path');

gsheets
  .getSpreadsheet(process.env.SPREADSHEET_ID)
  .then((spreadsheet) => spreadsheet.worksheets)
  .then((worksheetsMetadata) =>
    worksheetsMetadata.map((worksheet) =>
      gsheets.getWorksheetById(process.env.SPREADSHEET_ID, worksheet.id)
    )
  )
  .then((worksheetsPromises) => Promise.all(worksheetsPromises))
  .then((worksheets) =>
    worksheets.reduce((prev, curr) => {
      prev[curr.title] = curr.data;

      return prev;
    }, {})
  )
  .then((dataset) => {
    fs.writeFileSync(
      path.resolve('./', 'public', 'dataset.json'),
      JSON.stringify(dataset, null, 2)
    );

    console.log('Dataset generated successfully 😎');
  })
  .catch((error) => {
    console.error(error);

    process.exit(1);
  });
