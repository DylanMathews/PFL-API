const 	JwtStrategy = require('passport-jwt').Strategy
		ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('./resources/user')
const Sequelize = require('sequelize')
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sqlite"
})


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = "secret"
opts.issuer = "pfl-server"


passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
	const {user, err} = await User.findByEmail(jwt_payload.sub)

	if (err) {
		return done(err, false)
	}

	if (user) {
		return done(null, user)
	} else {
		return done(null, false)
	}
}))