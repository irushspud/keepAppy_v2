class UsersController < ApplicationController
  before_filter :save_login_state, :only => [:new, :create]
  def new
	@user = User.new
  end
  
  def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def create
	@user = User.new(params[user_params])
	if @user.save
		flash[:notice] = "Sign up succesful"
		flash[:color] = "valid"
                redirect_to(:action => 'home')
	else
		flash[:notice] = "Form is invalid"
		flash[:color] = "invalid"
	end
	redirect_to(:controller => :sessions,:action => 'home')
        
  end
end
