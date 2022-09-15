const express = require("express")
const app = express()
const cors = require("cors")
// const { fetchUrl } = require("./fetch-url")
// const { clean } = require("./clean")
// const { count } = require("./count")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded(({ extended: true })))

app.post("/", async function (req, res) {
  const url = req.body.url
  // const content = await fetchUrl(url)
  // const cleanedContent = clean(content)
  // const result = count(cleanedContent)
  res.send(result)
})

module.exports = app