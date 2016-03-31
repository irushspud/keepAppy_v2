module Api
  module V1
    class RegistrationsController < BaseController
  
      respond_to :json
      #handles registration of users from mobile
      def create
        user = User.new(user_params)
        if user.save
          render :json=> user.as_json(:auth_token=>user.authentication_token, :email=>user.email), :status=>201
          return
        else
          warden.custom_failure!
          render :json=> user.errors, :status=>422
        end

        protected
        def user_params
          params.require(:user).permit(:email,:password,:password_confirmation)
      end
    end 
  end
end
