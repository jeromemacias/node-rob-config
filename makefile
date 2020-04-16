.PHONY: test

install:
	@echo "Installing Node dependencies"
	@npm install

build-dev:
	./node_modules/.bin/babel --watch -d lib/ src/

build:
	./node_modules/.bin/babel -d lib/ src/

test:
	NODE_ENV=test ./node_modules/.bin/mocha --require @babel/register src/*.spec.js --timeout 5000
