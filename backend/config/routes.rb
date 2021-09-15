Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope :api do
    resources :collections, only: :index

    resources :projects, only: :index
  end

  root to: 'api#not_found'
end
