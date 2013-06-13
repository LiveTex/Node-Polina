


#
#   JS variables
#

JS_COMPILER = java -jar .build/compiler.jar

JS_COMPILER_ARGS = --warning_level VERBOSE \
				--output_wrapper="$(shell cat lib/output-wrapper.js)" \
				--language_in=ECMASCRIPT5_STRICT \
				--debug --formatting PRETTY_PRINT \
			  --externs lib/externs.js


#
#   Common
#

all: js-build


clean:
	rm -rf bin/



#
#	  JS
#


js-build : setup-build-dir index.js


js-lint : $(shell cat src.d)
	gjslint --beep --strict --custom_jsdoc_tags='namespace,event' $^;


js-check : $(shell cat src.d)
	$(JS_COMPILER) $(JS_COMPILER_ARGS) --compilation_level ADVANCED_OPTIMIZATIONS \
	               $(addprefix --js , $^)


index.js : $(shell cat src.d)
	$(JS_COMPILER) $(JS_COMPILER_ARGS) --compilation_level WHITESPACE_ONLY \
	               $(addprefix --js , $^) > bin/$@



#
#   Setup compiler and linter
#

setup : setup-compiler setup-linter


setup-compiler :
	if [ ! -f .build/compiler.jar ]; \
	then \
	mkdir .build/ ; \
	wget http://closure-compiler.googlecode.com/files/compiler-latest.zip -O .build/google-closure.zip ; \
	unzip .build/google-closure.zip -d .build/ compiler.jar ; \
	rm .build/google-closure.zip > /dev/null ; \
	fi


setup-linter :
	which gjslint > /dev/null; \
	[ $$? -eq 0 ] || sudo pip install -U http://closure-linter.googlecode.com/files/closure_linter-latest.tar.gz;


setup-build-dir :
	mkdir -p bin/
