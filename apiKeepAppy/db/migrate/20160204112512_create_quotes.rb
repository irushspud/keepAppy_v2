class CreateQuotes < ActiveRecord::Migration
  def change
    create_table :quotes do |t|
      t.text :cite
      t.string :progenitor
      t.integer :classification

      t.timestamps
    end
  end
end
