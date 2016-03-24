class Ability
  include CanCan::Ability
  
  def initialize(user)
    user ||= User.new #guest user
   
    if user.is? :admin
       can :manage, :all  #administrator can do everything
    elsif user.is? :regular
      can :read, :all  #not admins or creators can only read articles and quotes
    elsif user.is? :creator
      can :manage, [Article, Quote]  #can manage articles and quotes but not public feed
    end
  end

  
end
