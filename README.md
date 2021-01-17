# TypeScript Codemod Examples

This repository contains a basic sample codebase
dealing with brewing coffee. This codebase can then
be audited and codemodded:

- `yarn run audit` - executes `audit.ts`
- `yarn codemod` - executes `transform.ts`

This code audit and codemod are written in TypeScript
to take advantage of the type-safety. Particularly,
making sure the AST `node` properties are properly narrowed 
by it's `type` to prevent runtime errors.

This is the complete code used in the blog post
covering this in more depth: https://skovy.dev/codemod-workflow