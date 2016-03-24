class User < ActiveRecord::Base
   ROLES = %w[admin creator regular].freeze
  has_and_belongs_to_many :roles
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
 
  def is? (role)
    return !!self.roles.find_by_name(role.to_s.camelize)
  end
end
