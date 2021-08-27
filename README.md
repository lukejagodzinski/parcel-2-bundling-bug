# Parcel 2 Bug

To run reproduction you have to:

```sh
yarn
yarn build:parcel
# In different terminal window
yarn start
```

You can also compare result to TypeScript compiler which doesn't bundle but still is using the original version of the `app-root-path` package without modification that Parcel bundling does:

```sh
# Just to remove cache and dist dir
yarn clean
yarn build:ts
# In different terminal window
yarn start
```