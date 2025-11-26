# Plateforme d'enchères live

## Aperçu
Cette application Rails 8 fournit une plateforme de ventes aux enchères où les participants rejoignent des sessions en direct, surenchérissent en temps réel et identifient rapidement le gagnant pour chaque lot. Elle s'appuie sur Hotwire (Turbo/Stimulus) pour la réactivité et PropShaft/Importmap pour les assets, afin de simplifier le front-end sans build complexe.

## Fonctionnalités clés
- Création et gestion des lots mis en vente, avec prix de départ et fenêtre d'enchère.
- Sessions d'enchères live : mises à jour instantanées des offres et affichage du leader courant.
- Clôture et adjudication du lot avec prix final et gagnant.
- Journalisation et historique des enchères pour suivi et conformité.

## Pile technique
- Rails 8, Ruby compatible (>= 3.2 recommandé), Base de données SQLite en développement/test.
- Hotwire (Turbo/Stimulus) + Importmap pour le temps réel sans bundler JS.
- Puma comme serveur d'app, Solid Queue/Cable/Cache disponibles pour la scalabilité.
- Minitest, Capybara/Selenium pour les tests.

## Prérequis
- Ruby et Bundler installés (version compatible Rails 8).
- SQLite3 disponible localement.
- Node non requis (Importmap).

## Installation et lancement rapide
```bash
bin/setup          # installe les gems, prépare la DB et les seeds
bin/dev            # démarre le serveur avec hot reload (Procfile.dev)
# ou
bin/rails s        # démarre uniquement Puma
bin/rails db:prepare
```

## Tests et qualité
```bash
bin/rails test         # suite Minitest
bin/rails test:system  # tests système Capybara/Selenium
bin/rubocop            # style rubocop-rails-omakase
bin/brakeman           # scan sécurité
```
Ajoutez des tests pour toute nouvelle logique (modèles, services, contrôleurs) et privilégiez des scénarios système pour les parcours d'enchères critiques.

## Structure du dépôt
- `app/` code applicatif (controllers, models, views, Stimulus controllers).
- `config/` routes, environnements, initializers.
- `db/` schéma et migrations.
- `test/` suites Minitest, fixtures, tests système.
- `bin/` scripts fournis (rails, rake, dev, setup, rubocop, brakeman).

## Flux de développement
- Utilisez des commits courts au format `type: message` (ex. `fix: corrige la fermeture d'enchère`).
- Incluez migrations + code + tests dans le même commit quand pertinent.
- Pull requests : description claire, pas à pas de test, captures pour changements UI, et mention des impacts DB/config.
