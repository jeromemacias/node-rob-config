.PHONY: test

install:
	@echo "Installing Node dependencies"
	@npm install

build-dev:
	./node_modules/.bin/babel --watch -d lib/ src/ --ignore *.spec.js

build:
	./node_modules/.bin/babel -d lib/ src/ --ignore *.spec.js

test:
	NODE_ENV=test ./node_modules/.bin/mocha --compilers js:babel-register src/*.spec.js
