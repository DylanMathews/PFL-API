const express = require('express')
const app = express()
const {db} = require('./resources/resources')

app.get('/', (req, res) => {
	res.json("Hello");
})

app.listen(4000, () => {
	console.log("Listening on port 4000!")
})