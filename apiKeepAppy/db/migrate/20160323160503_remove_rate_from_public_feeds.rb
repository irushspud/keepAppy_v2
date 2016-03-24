class RemoveRateFromPublicFeeds < ActiveRecord::Migration
  def change
    remove_column :publicfeeds, :rate, :integer
  end
end
