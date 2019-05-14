var router = require("express").Router();
var User = require('./models/user');
var passport = require('passport');
const request = require('request');
var middleware = require("./middlewares/auth");

router.get("/", function (req, res) {
	res.render("index.ejs");
})

router.get("/profile", middleware.isAuthenticated, function (req, res) {
	var shipments = [{
			id: 1000,
			desc: "The product is ok",
			track: 1,
			lat: 67.043,
			lng: 74.567
		},
		{
			id: 1002,
			desc: "The product is ok",
			track: 2,
			lat: 68.043,
			lng: 144.567
		}
	];
	res.render("profile", {
		shipments: shipments
	});
});

router.get("/track/:id", middleware.isAuthenticated, function (req, res) {
	var locations = [{
			id: 1,
			lat: 67.043,
			lng: 74.567
		},
		{
			id: 2,
			lat: 68.043,
			lng: 144.567
		}
	];
	var loc = null;

	for (var i = 0; i < locations.length; ++i) {
		var element = locations[i];
		if (element.id == req.params.id) {
			loc = element;
			break;
		}
	}
	res.render("track", {
		loc: loc
	});
});

router.get("/login", function (req, res) {
	var message = req.query.err;
	res.render("login.ejs", {
		message: message
	});
})

router.post("/login", passport.authenticate("local", {
	successRedirect: "/profile",
	failureRedirect: "/login?err=Invalid Username or Password",
	failureFlash: 'Invalid Username or Password',
}), function (req, res) {
	return res.send("Hello");
})

router.get("/register", function (req, res) {
	message = req.query.message;
	res.render("register.ejs", {
		message: message
	});
})

router.post("/register", function (req, res) {
	var newUser = new User({
		username: req.body.username,
		firstName: req.body.firstname,
		lastName: req.body.lastname,
		contact: req.body.contact,
		age: req.body.age,
		email: req.body.email
	});

	console.log(newUser);

	User.register(newUser, req.body.pass, function (err, user) {
		if (err) {
			console.log(err)
			message = err.message;
			return res.redirect("/register?message=" + message);
		}
		console.log(req.body.pass)
		passport.authenticate("local", function (error, user, info) {
			// this will execute in any case, even if a passport strategy will find an error
			// log everything to console
			console.log("askdhhksjdafvgajdgvfjasdgvjash");
			console.log(error);
			console.log(user);
			console.log(info);

			if (error) {
				res.status(401).send(error);
			} else if (!user) {
				res.status(401).send(info);
			} else {
				next();
			}

			res.status(401).send(info);
		})(req, res, function () {
			console.log("Reached!!\n")
			res.redirect("/profile");
		});
	});
})

router.get('/logout', function (req, res) {
	req.logOut();
	res.redirect("/");
})

router.get('*', function (req, res) {
	res.status('Page Not Found').status(404);
});


module.exports = router