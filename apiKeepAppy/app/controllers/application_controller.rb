class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
			  #  :exception
  #protect_from_forgery with: :exception
=begin
  rescue_from AccessDenied redirects a user to the login screen if they thry to access something if not logged in or 
  do not have the appropriate permissions
=end
  rescue_from CanCan::AccessDenied do |exception|
    flash[:error] = exception.message
    redirect_to "/users/sign_up"
  end
  before_action :configure_permitted_parameters, if: :devise_controller?
  protected
=begin
  Configure_permitted_parameters, ensures that the user role is added to the user table on sign up 
  allowing for permisions to be used.
=end
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :role
  end

end
