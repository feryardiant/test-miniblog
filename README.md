# The MiniBlog

A simple mini-blogging app built using Adonnis, Inertia and Vue.

## Usage

To run the app locally, you'll need to clone the repo and install it's dependencies

```sh
git clone git@github.com:feryardiant/test-miniblog && cd $_
corepack parepare --activate
pnpm install
```

Once everything is ready you'll need to run the migration and seed the sample database,

```sh
node ace migration:refresh && node ace db:seed
```

### Development

1. Use `pnpm dev` to start development server
2. Use `pnpm test` to run the tests suite
3. Use `pnpm build` if you're ready to ship the app
