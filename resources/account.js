const Sequelize = require('sequelize')
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sqlite"
})
const bcrypt = require('bcrypt')


// Data definition
const Account = sequelize.define('account', {
	email: Sequelize.TEXT,
	passwordHash: Sequelize.TEXT
})


// Class Methods
Account.validatePassword = password => {
	if (password.length > 6) {
		return true
	} else {
		return false
	}
}
Account.hashPassword = (username, password) => {
	const saltRounds = 10

	return bcrypt.hashSync(`${username}:${password}`, saltRounds)
}


Account.create = (username, password) => {
	if (Account.validatePassword(password)) {
		const account = Account.build({ username, passwordHash: Account.hashPassword(username, password)})
		return account
	} else {
		throw new Error("Password is invalid.")
	}
}


// Instance Methods
Account.prototype.isCorrectPassword = password => {
	const hash = Account.hashPassword(this.email, password)

	return hash == this.passwordHash ? true : false
}

Account.prototype.changePassword = new_password => {
	if (Account.validatePassword(new_password)) {
		this.passwordHash = Account.hashPassword(this.email, new_password)
	} else {
		throw new Error("Password is invalid.")
	}
}


module.exports = Account