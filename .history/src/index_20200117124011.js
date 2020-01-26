const express = require('express')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.listen(port, () => {
    <h1>Chat App</h1>
})
