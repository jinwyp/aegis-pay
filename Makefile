include ../aegis-docker/bin/Makefile

self:
	@./backend/run.sh self

.PHONY: static
static:
	@cd app && npm install && bower install && gulp build
