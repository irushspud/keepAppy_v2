class Ability
  include CanCan::Ability
  
  def initialize(user)
    #user ||= User.new 			#guest user
   
    
    can :manage, :all if user.role == "admin"  #administrator can do everything
     
    can [:read, :create], [Publicfeed] if user.role == "regular" #not admins or creators can only read articles and quotes
     
    can :manage, [Article, Quote] if user.role == "creator" #can manage articles and quotes but not public feed
    
  end

  
end
