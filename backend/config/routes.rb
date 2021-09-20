require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  # Don't need it for now
  # devise_scope :admin_user do
  #   authenticated :admin_user do
  #     mount Sidekiq::Web => '/sidekiq'
  #   end
  # end
  ActiveAdmin.routes(self)

  scope :api do
    resources :collections, only: %i[index] do
      member do
        post :current_price
      end
    end

    resources :projects, only: :index
  end

  root to: 'api#not_found'
end
