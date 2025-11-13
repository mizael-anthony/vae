# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rails 8.0 application with a minimal authentication system and classified ads functionality. Uses SQLite, Turbo/Stimulus, Tailwind CSS with daisyUI, and follows Rails conventions.

## Development Commands

### Setup & Server
```bash
bin/setup              # Install gems, prepare database, clear logs/tmp
bin/dev                # Start development server (wrapper around bin/rails server)
bin/rails server       # Alternative: start server directly
```

### Database
```bash
bin/rails db:prepare   # Create/migrate/seed for current environment
bin/rails db:seed      # Load seed data (creates demo@example.com / password)
bin/rails db:migrate   # Run pending migrations
bin/rails db:rollback  # Rollback last migration
```

### Testing
```bash
bin/rails test                          # Run all tests
bin/rails test test/models/user_test.rb # Run specific test file
bin/rails test:system                   # Run system tests only
```

### Styling (Tailwind + daisyUI)
```bash
yarn install                    # Install UI dependencies (one-time)
bin/rails tailwindcss:build     # Compile CSS for deployment
bin/rails tailwindcss:watch     # Live reload CSS during development
```

### Code Quality
```bash
bundle exec rubocop    # Check style (Rails Omakase config)
bundle exec brakeman   # Security analysis
```

## Architecture

### Authentication Flow
- Custom session-based authentication using `has_secure_password` (not Devise)
- `ApplicationController` provides `current_user`, `logged_in?`, `require_login`, and `require_owner(record)` helpers
- All helpers are `helper_method` so available in views
- Sessions managed in `SessionsController` (singleton resource)
- User registration in `Users::RegistrationsController` (namespaced)
- Password validation: minimum 8 characters, email normalized to lowercase

### Authorization Pattern
Controllers use a two-step authorization:
1. `before_action :require_login` - ensures user is logged in
2. `before_action :authorize_owner!` - calls `require_owner(@record)` to verify ownership

Example from `AdsController`:
```ruby
before_action :require_login, except: %i[index show]
before_action :set_ad, only: %i[show edit update destroy]
before_action :authorize_owner!, only: %i[edit update destroy]
```

### Data Model
- `User`: email (unique, case-insensitive), password_digest
- `Ad`: title, description, price (decimal), belongs_to user
- Foreign key constraint: `ads.user_id` → `users.id` with dependent destroy

### Routes Structure
```
root → ads#index
/ads → standard RESTful resource
/session → singleton resource (new, create, destroy)
/users/registrations → only new, create
```

### Styling System
- Tailwind scans: `app/views/**/*.{erb,html}`, `app/helpers/**/*.rb`, `app/javascript/**/*.js`
- Custom brand colors (blue palette) and fonts (Inter, Poppins) in `config/tailwind.config.js`
- daisyUI themes: "corporate" (light) and "business" (dark)
- Dark mode toggle via Stimulus controller (`app/javascript/controllers/dark_mode_controller.js`)
- Output: `app/assets/builds/tailwind.css`

### Frontend Stack
- Turbo for SPA-like navigation
- Stimulus for JavaScript controllers
- Importmap for ES modules (no bundler)
- daisyUI component library

## Key Conventions

### File Organization
- Controllers: `app/controllers/` (use namespaces like `Users::RegistrationsController`)
- Models: `app/models/` (keep logic lean, extract to POROs in `lib/` as needed)
- Views: `app/views/` (mirror controller names)
- Stimulus: `app/javascript/controllers/*_controller.js`
- Migrations: `db/migrate/YYYYMMDDHHMMSS_description.rb`

### Code Style (Rails Omakase)
- Ruby: UTF-8, 2-space indent, snake_case methods, CamelCase classes
- Single quotes unless interpolation needed
- Keep controller actions small
- Run rubocop before commits

### Testing
- Minitest framework
- Fixtures in `test/fixtures/`
- System tests use Capybara/Selenium
- Always run `bin/rails test` before merging
- Clean up state in `teardown`

### Commit Format
Follow existing pattern: `type: summary` (e.g., `refactor: trim unused params`, `init: project`)
- One logical change per commit
- Mention migration IDs in body
- Keep commits imperative and concise

## Important Notes

- SQLite databases (`db/*.sqlite3`) and storage (`storage/`) are local-only, never commit
- Secrets managed via `bin/rails credentials:edit`
- Keep `.env` files private (use dotenv gem)
- Background jobs use `solid_queue`, Action Cable uses `solid_cable` (no Redis needed)
- Browser compatibility: only modern browsers (allows webp, import maps, CSS nesting, :has)
- Demo credentials from seed: `demo@example.com` / `password`