# App NAME

## Running App Locally

1. Clone this repository.
2. Open the terminal at the root of the repository.
3. Install dependencies with `pnpm install`.
4. Run `pnpm docker:up` to start database container.
5. Run `pnpm start:api` to start API.
6. Run `pnpm start:app` to start frontend/client application.
7. Alternatively, use `pnpm start:all` to run `pnpm start:api` and `pnpm start:app` concurrently. 
If this command causes an error indicating "concurrently" not found, try running `pnpm install -g concurrently` or 
`npm install -g concurrently` and try again.