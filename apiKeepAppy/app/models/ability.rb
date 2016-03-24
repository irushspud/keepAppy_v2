class Ability
  include CanCan::Ability
  
  def initialize(user)
    user ||= User.new #guest user
   
    if user.role? :admin
       can :manage, :all
    elsif user.role? :regular
      can :read, :all
    elsif user.role? :creator
      can :manage, :all
    end
  end

  
end
