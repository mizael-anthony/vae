# Repository Guidelines

## Project Structure & Module Organization
Rails 8.0 code lives under `app/`: models, controllers, views, jobs, mailers, and helpers mirror the framework defaults, while Turbo/Stimulus assets sit in `app/javascript` and legacy CSS/images in `app/assets`. Database migrations/schema belong to `db/`, environment configs to `config/`, and reusable POROs to `lib/`. Tests shadow their targets inside `test/`, and runtime/generated artifacts (`log/`, `tmp/`, `storage/`, SQLite files in `db/`) must stay out of Git.

## Build, Test, and Development Commands
- `bin/setup` — install gems, prep SQLite, clear logs/tmp, then optionally boot the server.
- `bin/dev` — wrapper around `bin/rails server`; pass `-p` or `-b` as needed.
- `bin/rails db:prepare` — create/migrate/seed for the current environment.
- `bin/rails test` — run unit, integration, and system suites; target a file for faster loops.
- `bundle exec rubocop` / `bundle exec brakeman` — style + security gates prior to a PR.

## Coding Style & Naming Conventions
Ruby files use UTF-8, two-space indentation, and snake_case identifiers; classes/modules stay CamelCase and constants SCREAMING_SNAKE_CASE. Timestamp every migration (`20250214101526_add_status_to_orders.rb`) and keep controller/model methods small by extracting POROs into `lib/` when logic grows. Stimulus controllers follow the `*_controller.js` pattern, and helper modules should remain pure functions. Prefer single quotes in Ruby unless interpolation is needed, and let the RuboCop Rails Omakase config be the source of truth.

## Testing Guidelines
Minitest drives coverage. Place tests beside their subjects (`test/models`, `test/controllers`, `test/system`), name files `*_test.rb`, and keep fixtures in `test/fixtures` with minimal cross-talk. Exercise new UI flows with at least one Capybara system spec and clean up any temporary state in `teardown`. Never merge without a green `bin/rails test`; run scoped commands like `bin/rails test test/models/user_test.rb` for tight feedback.

## Commit & Pull Request Guidelines
History shows short imperative commits with a `type: summary` prefix (`refactor: trim unused params`). Follow that format, one logical change per commit, and mention migration IDs or config updates in the body. PRs need: problem statement, solution outline, DB/config notes, and testing evidence; attach screenshots for UI diffs and link work items with `Fixes #NN`. Request review only after RuboCop, Brakeman, and the test suite succeed locally.

## Security & Configuration Tips
Edit secrets via `bin/rails credentials:edit` and keep `.env` files private. Favor the bundled `solid_queue`/`solid_cable` adapters for background work instead of introducing new services. SQLite databases (`db/*.sqlite3`) and Active Storage blobs (`storage/`) are developer-local and should never leave the workspace.

