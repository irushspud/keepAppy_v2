class User < ActiveRecord::Base

  ROLES = %w[admin creator regular].freeze
  has_and_belongs_to_many :roles
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :token_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def is? (role)
    roles.include?(role.to_s)
  end
end
