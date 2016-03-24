class Ability
  include CanCan::Ability
  
  def initialize(user)
    user ||= User.new #guest user
   
    if user.is? :admin
       can :manage, :all
    elsif user.is? :regular
      can :read, :all
    elsif user.is? :creator
      can :manage, [Article, Quote]
    end
  end

  
end
