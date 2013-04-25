#
#	Variables
#

JS_BUILD_HOME ?= /usr/lib/js-build-tools

JS_ROOT_DIR  = ./
JS_LEVEL = WHITESPACE_ONLY

JS_DEPS_DIRS ?= node_modules/node-ds/ node_modules/node-util/

include $(JS_BUILD_HOME)/js-variables.mk

#
#	Rules
#

all: build

check: js-test-compile js-test-lint

build: js-externs js-export

clean: js-clean

include $(JS_BUILD_HOME)/js-rules.mk
