Rails.application.routes.draw do
  root 'rental#index'
  post 'show/selected/car' => 'rental#show'
  get 'show/selected/car', to: redirect('/')
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
