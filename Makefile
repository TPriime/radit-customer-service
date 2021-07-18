TAG=radit-customer-service
PORT=7000

action: build

run: build
	@echo "Running application..."
	@docker run -d -p $(PORT):$(PORT) --name $(TAG) $(TAG)

run-it: build
	@echo "Running application..."
	@docker run --rm -it --env DB_PORT=27017 -p $(PORT):$(PORT) --name $(TAG) $(TAG)

build: test
	@echo "Creating docker image..."
	@docker build -t $(TAG) .

test: node_modules
	@echo "Running tests..."
	@yarn test

node_modules:
	@echo "Install node dependencies..."
	@yarn install

clean:
	@echo "Removing docker image..."
	@docker rm $(TAG)

.PHONY: run run-it build test clean