const express = require('express')
const app = express()
const port = process.env.Port || 5000;

app.get('/', (req, res) => {
    res.send('Hello From Doctor Uncle')
})

app.listen(port, () => {
    console.log(`Doctor App Listening on port  ${port}`)
})