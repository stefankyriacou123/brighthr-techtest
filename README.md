# BrightHR Technical Test

The implementation is a table rendering the absence list api.

## Instructions

Installation:

```sh
pnpm install
```

To run dev server:

```sh
pnpm dev
```

To run storybook:

```sh
pnpm storybook
```

To run tests:

```sh
pnpm test.all
```

## Notes

You can sort by any of the columns in the header by clicking on them.

It is implemented using @tanstack/table and @tanstack/virtual, which means it can handle very, very large lists (and support real time sorting/filtering).

## If I had more time

If I had more time, I would configure (jpeg) snapshot testing of the storybook stories (this can be done using a paid service like chromatic, or setup manually using something like playwright as the engine for generating the jpeg snapshots of each of the components, and for ci/cd you can store the generated snapshots in object storage like aws s3).

In terms of things I would have liked to have done for the app itself, I would:

- Configure more thorough linting and prettier.
- Configure turborepo, which is ideal for managing large codebases by increasing modularity and build times.
- Dockerise the development environment so that it is standardised across environments and generated jpeg snapshots on local environments are always identical.
