const 	JwtStrategy = require('passport-jwt').Strategy
		ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('./resources/user')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = "secret"
opts.issuer = "pfl-server"
opts.audience = "www.pfl.com"
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
	
}))