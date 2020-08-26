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

const User = sequelize.define('user', {
	firstName: Sequelize.TEXT,
	lastName: Sequelize.TEXT
})

const Pokemon = sequelize.define('pokemon', {
	trainerId: Sequelize.INTEGER,
	species: Sequelize.TEXT,
	level: Sequelize.INTEGER,
	blob: Sequelize.BLOB
})

const Save = sequelize.define('save', {
	raw: Sequelize.BLOB
})

const Account = sequelize.define('account', {
	email: Sequelize.TEXT,
	passwordHash: Sequelize.TEXT
})

User.hasOne(Account)
User.hasMany(Pokemon)
User.hasMany(Save)

Pokemon.belongsTo(User)
Save.belongsTo(User)
Account.belongsTo(User)

sequelize.sync({force: true});

module.exports = {db: sequelize, User, Pokemon, Save}