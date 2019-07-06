Rails.application.routes.draw do
  resources :albums
  # namespace :images do
  #   resource :upload, only: :create
  # end
  mount ImageUploader.upload_endpoint(:cache) => "/images/upload"

  root to: 'albums#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
