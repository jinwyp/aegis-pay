include ../aegis-docker/bin/Makefile

self:
	@./backend/run.sh self

.PHONY: static
static:
	@cd frontend && npm install && bower install && gulp build
