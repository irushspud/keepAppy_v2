class CreatePublicfeeds < ActiveRecord::Migration
  def change
    create_table :publicfeeds do |t|
      t.string :title
      t.integer :rate

      t.timestamps
    end
  end
end
