class SessionsController < ApplicationController
  before_filter :authenticate_user!, :only => [:home, :setting, :quotes, :articles]
  before_filter :save_login_state, :only => [:login, :login_attempt]
  def login
    #render "login"
  end

  def login_attempt
    #render "login"
    authorized_user = User.authenticate(params[:username_or_email],params[:login_password])
    if authorized_user
      session[:user_id] = authorized_user.id
      flash[:notice] = "Welcome again, you logged in as #{authorized_user.username}"
      redirect_to :action =>'home'
    else
      flash[:notice] = "Invalid Username or Password"
      flash[:color]= "invalid"
      render "login"
    end
  end

  def logout
    session[:user_id] = nil
    redirect_to :action => 'login_attempt'
  end

  def home
    render "home"
  end

  def setting
    #render "setting"
  end
end
