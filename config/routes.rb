Rails.application.routes.draw do
  resources :albums

  root to: 'albums#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
