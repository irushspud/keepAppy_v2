class Article < ActiveRecord::Base
  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>", stretch: "600x300" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  
  acts_as_taggable 
  attr_accessor :image_url
  def image_url
    image.url
  end
end
