class RemoveClassificationFromArticles < ActiveRecord::Migration
  def change
    remove_column :articles, :clssificaton, :integer
  end
end
