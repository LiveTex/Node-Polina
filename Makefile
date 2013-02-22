

#
#	Variables
#

JS_BUILD_HOME ?= /usr/lib/js-build-tools

DESTDIR = 

JS_ROOT_DIR  = ./
JS_DEPS_DIRS = /usr/lib/node/ds/

include $(JS_BUILD_HOME)/js-variables.mk



MODULE_NAME ?= polina
INSTALL_PREFIX ?= /usr/lib/


#
#	Rules
#

all : js-externs js-export


check : js-test-compile js-test-lint


install-dev :
	ln -sf $(CURDIR) $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME)


install :
	mkdir -p $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME)/bin/;
	mkdir -p $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME)/externs/;
	cp package.json $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME)/;
	cp bin/index.js $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME)/bin/;
	cp -R externs/*.js $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME)/externs/;


uninstall :
	rm -rf $(DESTDIR)$(INSTALL_PREFIX)/node/$(MODULE_NAME);


clean : js-clean


include $(JS_BUILD_HOME)/js-rules.mk
