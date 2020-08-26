const express = require('express')
const app = express()
const {db, User, Pokemon, Account} = require('./resources/resources')

const PORT = 4000

app.get('/', (req, res) => {
	res.json("Hello");
})

app.get('/pokemon', async (req, res) => {
	// explicitly check for userId query
	try {
		const {userId} = req.query
		const params = {userId} // This way, params has only known keys. DON'T TRUST THE FRONTEND!
		const pokemon = Pokemon.findAll({where: params})

		res.status(200).json(pokemon)
	} catch (e) {
		console.error(e)
		res.status(400).json({error: "Could not find pokemon."})
	}
})

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}!`)
})