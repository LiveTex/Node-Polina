#
#	Variables
#

JS_BUILD_HOME ?= /usr/lib/js-build-tools

DESTDIR = 

JS_ROOT_DIR  = ./
JS_CUSTOM_EXTERNS = 
JS_DEFAULT_ENV = node
JS_LEVEL = WHITESPACE_ONLY

MODULE_NAME = polina

DEV_INSTALL_PREFIX ?= /usr/lib/node
DEPLOY_INSTALL_PREFIX ?= /var/lib/livetex/Livetex-Server
DEPLOY_RELEASE = 1.0.0

JS_DEPS_DIRS =  /usr/lib/node/ds/

include $(JS_BUILD_HOME)/js-variables.mk

#
#	Rules
#

all: build


check: js-test-compile js-test-lint


build: js-export


install: install-dev


install-dev:
	mkdir -p $(DEV_INSTALL_PREFIX)/$(MODULE_NAME)/bin/;
	mkdir -p $(DEV_INSTALL_PREFIX)/$(MODULE_NAME)/externs/;
	cp package.json $(DEV_INSTALL_PREFIX)/$(MODULE_NAME)/;
	cp bin/index.js $(DEV_INSTALL_PREFIX)/$(MODULE_NAME)/bin/;
	cp externs/index.js $(DEV_INSTALL_PREFIX)/$(MODULE_NAME)/externs/;


install-deploy:
	mkdir -p $(DEPLOY_INSTALL_PREFIX)/$(DEPLOY_RELEASE)/deps/$(MODULE_NAME)/bin/;
	mkdir -p $(DEPLOY_INSTALL_PREFIX)/$(DEPLOY_RELEASE)/deps/$(MODULE_NAME)/externs/;
	cp package.json $(DEPLOY_INSTALL_PREFIX)/$(DEPLOY_RELEASE)/deps/$(MODULE_NAME)/;
	cp bin/index.js $(DEPLOY_INSTALL_PREFIX)/$(DEPLOY_RELEASE)/deps/$(MODULE_NAME)/bin/;
	cp externs/index.js $(DEPLOY_INSTALL_PREFIX)/$(DEPLOY_RELEASE)/deps/$(MODULE_NAME)/externs/;


uninstall: uninstall-dev


uninstall-dev:
	rm -rf $(DEV_INSTALL_PREFIX)/$(DEPLOY_RELEASE)/deps/$(MODULE_NAME);


uninstall-deploy:
	rm -rf $(DEPLOY_INSTALL_PREFIX)/$(DEPLOY_RELEASE)/deps/$(MODULE_NAME);


clean: js-clean


include $(JS_BUILD_HOME)/js-rules.mk
