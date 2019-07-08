Rails.application.routes.draw do
  root 'rental#index'
  post 'filtered/cars' => 'rental#show'
  get 'filtered/cars', to: redirect('/')
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
