const User = require('./user')
const Pokemon = require('./pokemon')
const Account = require('./account')
const Save = require('./Save')

const Sequelize = require('sequelize')
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sqlite"
})

sequelize
	.authenticate()
	.then(() => {
		console.log("Database connection has been established successfully.")
	})
	.catch(err => {
		console.error("Unable to connect to database.")
	})

User.hasOne(Account)
User.hasMany(Pokemon)
User.hasMany(Save)

Pokemon.belongsTo(User)
Save.belongsTo(User)
Account.belongsTo(User)

sequelize.sync({force: true});

module.exports = {db: sequelize, User, Pokemon, Save}