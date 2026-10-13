# Repository Guidelines

## Project Structure & Module Organization

This repository is currently an empty project scaffold: it contains only repository metadata and no application source, tests, assets, or build configuration. As implementation begins, keep the top-level layout conventional and predictable:

- `src/` for production code, organized by feature or domain.
- `tests/` for automated tests that mirror the relevant `src/` paths.
- `assets/` for static files such as images, fonts, or fixtures.
- `docs/` for design notes and user-facing documentation.

Avoid placing generated files, local credentials, or editor-specific settings in version control.

## Build, Test, and Development Commands

No build system, package manager, or test runner is configured yet. When adding one, document the authoritative commands here and in the project README. Prefer scripts that give contributors a consistent interface, for example:

```sh
npm run dev     # start local development
npm test        # run the full test suite
npm run lint    # check formatting and static analysis
```

Do not introduce a new toolchain without also committing its lockfile and configuration.

## Coding Style & Naming Conventions

Follow the formatter and linter selected for the project; do not hand-format code against automated output. Use 2 spaces for JSON, YAML, and JavaScript/TypeScript unless the language ecosystem requires otherwise. Name files and directories in `kebab-case`; use `PascalCase` for component/class names and `camelCase` for functions and variables. Keep modules small, focused, and free of unrelated refactors.

## Testing Guidelines

Add tests alongside every new behavior and regression fix. Use descriptive names that state the expected outcome, such as `returns-empty-list-when-no-records-exist`. Place shared test data in `tests/fixtures/` rather than duplicating it. Run the relevant test command and lint checks before requesting review.

## Commit & Pull Request Guidelines

There is no commit history yet, so use concise, imperative commit subjects: `Add user profile validation` or `Fix empty search response`. Keep commits scoped to one logical change. Pull requests should explain the change, identify testing performed, link any issue when applicable, and include screenshots for visible UI changes. Call out configuration, migration, or security implications explicitly.
