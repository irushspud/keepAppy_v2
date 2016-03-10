class AddContentToPublicfeeds < ActiveRecord::Migration
  def change
    add_column :publicfeeds, :content, :text
  end
end
