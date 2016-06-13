include ../aegis-docker/bin/Makefile

static:
	@cd app && npm install && bower install && gulp build

