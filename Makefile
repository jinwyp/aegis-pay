include ../aegis-docker/bin/Makefile

.PHONY: static
static:
	@cd app && npm install && bower install && gulp build

