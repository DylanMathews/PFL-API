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
Account.hashPassword = (password) => {
	const saltRounds = 10

	return bcrypt.hashSync(`${password}`, saltRounds)
}


Account.create = (username, password) => {
	if (Account.validatePassword(password)) {
		const account = Account.build({ username, passwordHash: Account.hashPassword(password)})
		return account
	} else {
		throw new Error("Password is invalid.")
	}
}

Account.find = async (username, password) => {
	const user = Account.findOne({where: {email: username}})

	if (user.isCorrectPassword(password)) {
		return user
	} else {
		return false
	}
}
// Instance Methods
Account.prototype.isCorrectPassword = password => {
	const hash = Account.hashPassword(password)

	return hash == this.passwordHash ? true : false
}

Account.prototype.changePassword = new_password => {
	if (Account.validatePassword(new_password)) {
		this.passwordHash = Account.hashPassword(new_password)
	} else {
		throw new Error("Password is invalid.")
	}
}

Account.prototype.changeEmail = email => {
	this.email = email
}



module.exports = Account