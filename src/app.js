const express = require('express')
const app = express()
const port = 3000;
const { createTables, createRows, fetchBrands } = require('./database/pg');

// Top level await
(async () => {
  // await createDatabase();
})();

app.get('/', async (req, res) => {
  await createTables();
  await createRows();
  const response = await fetchBrands();

  let listItems = ['no data']
  if (response?.rows) {
    listItems = response.rows.map(ele => {
      return `<li>${ele.name}</li>`
    })
    // Removes commas
    listItems = listItems.join('')
  }

  res.send(`
    <html>
      <head>
      </head>
      <body>
        <h1>Brands</h1>
        <ul>
        ${listItems}
        </ul>
      </body>
    </html>
  `)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
