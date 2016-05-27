// ErrorPage middleware
exports.errorPage = function (req, res, next) {
	res.render404 = function (error) {
		return res.status(404).send({ error: error });
	};

	res.renderError = function (error, statusCode) {
		if (statusCode === undefined) {
			statusCode = 400;
		}
		return res.status(statusCode).send({ error: error });
	};


	res.status(404);

	// respond with html page
	if (req.accepts('html')) {
		res.render('global/globalTemp/page404', { url: req.url });
		return;
	}

	// respond with json
	if (req.accepts('json')) {
		res.render404({ error: 'Page Not found' });
		return;
	}

	// default to plain-text. send()
	res.type('txt').send('Not found');

};
