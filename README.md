# README

## Authentication & Ads Quickstart

1. Install gems and set up the database:

   ```bash
   bundle install
   bin/rails db:prepare
   bin/rails db:seed # optional demo data
   ```

2. Run the local server:

   ```bash
   bin/dev
   ```

3. Visit `http://localhost:3000/` to browse ads, sign up, and create listings. The seed data creates `demo@example.com` / `password` for quick testing.

4. Run the automated tests any time you touch models or controllers:

   ```bash
   bin/rails test
   ```

The app provides a minimal authentication system (manual `has_secure_password`) and an `Ad` resource with per-user ownership checks. Modify or extend this setup as needed for your project.

## Styling Workflow (Tailwind + daisyUI)

1. Install the UI dependencies once:

   ```bash
   yarn install
   ```

2. Compile CSS when deploying or after updating `app/assets/tailwind/application.css`:

   ```bash
   bin/rails tailwindcss:build
   ```

3. For live reloading during development, keep the watcher running in a second terminal:

   ```bash
   bin/rails tailwindcss:watch
   ```

Tailwind scans Rails views/helpers/JavaScript (see `config/tailwind.config.js`) and outputs to `app/assets/builds/tailwind.css`. Components use daisyUI themes plus a custom brand palette/font stack defined in the config. The layout also exposes a theme toggle powered by a small Stimulus controller.
