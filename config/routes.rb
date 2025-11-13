Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :users do
    resources :registrations, only: %i[new create]
  end

  resource :session, only: %i[new create destroy]

  resources :ads

  # Defines the root path route ("/")
  root "ads#index"
end
