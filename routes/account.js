const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const Account = require('../resources/account')


router.post('/login', (req, res) => {
	const {email, password} = req.body

	const user = Account.find(email, password)

	if (user) {
		const signedJwt = jwt.sign({email: user.email}, 'secret')
		res.status(200).send(signedJwt)
	} else {
		res.status(500).json({error: "Authentication failed."})
	}
})