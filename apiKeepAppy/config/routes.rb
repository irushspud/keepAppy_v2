Rails.application.routes.draw do
  
  
  

  devise_for :users

  #match "/login", :to => "sessions#login_attempt", via: [:get,:post]
  #match "/logout", :to => "sessions#logout", via: [:get,:post]
  match "/", :to => "sessions#home", via: [:get,:post]
  match "/setting", :to => "sessions#setting", via: [:get,:post]
  


  namespace :api, defaults: {format:'json'} do
  # /api/...  Api::
    namespace :v1 do
      devise_for :users
      resources :base
      resources :registrations
      resources :quotes do
        collection do
          get :tag
        end
      end
      resources :articles do
        collection do
          get :tag
        end
      end
      resources :publicfeeds
    end
    
  end
  #route for tags 
  
  
  #get 'articles/:tag', to: 'articles#index', as: :tag
  
  resources :publicfeeds

  resources :quotes do
    collection do
     get :tag
    end
  end

  resources :articles do
    collection do
      get :tag
    end
  end

 

  
  

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
