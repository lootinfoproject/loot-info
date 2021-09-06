Rails.application.routes.draw do
  scope :api do
    resources :collections, only: :index

    resources :projects, only: :index
  end

  root to: 'application#not_found'
end
