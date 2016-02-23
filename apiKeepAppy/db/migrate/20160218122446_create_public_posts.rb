class CreatePublicPosts < ActiveRecord::Migration
  def change
    create_table :public_posts do |t|
	t.text :post
	t.integer :rate 
        t.timestamps
    end
  end
end
