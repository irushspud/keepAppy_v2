module Api
  module V1
    class SessionsController < DeviseController
      before_filter :authenticate_user!, :except => [:new, :destroy]
      before_filter :ensure_params_exist

      respond_to :json
      #creates a new user session as they login if they have valid information
      def create
        self.resource = User.find_for_database_authentication(:email=>params[:user][:email])
        return invalid_login_attempt unless resource

        if resource.valid_password?(params[:user][:password])
          sign_in("user", resource)
          resource.ensure_authentication_token!
          render :json=> {:success=>true, :auth_token=>resource.authentication_token, :email=>resource.email}
         return
       end
       invalid_login_attempt
      end
     #destroys current users session and logs the user out
     def destroy
       current_user.reset_authentication_token
       render :json=> {:success=>true}
     end

     protected
     def ensure_params_exist
       return unless params[:user].blank?
       render :json=>{:success=>false, :message=>"missing user_login parameter"}, :status=>422
     end

     def invalid_login_attempt
       warden.custom_failure!
       render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
     end
    end
  end
end
