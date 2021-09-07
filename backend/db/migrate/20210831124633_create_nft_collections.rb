class CreateNftCollections < ActiveRecord::Migration[6.1]
  def change
    create_table :nft_collections do |t|
      t.string :name
      t.decimal :current_floor, precision: 18, scale: 18
      t.decimal :previous_floor, precision: 18, scale: 18
      t.timestamps
    end
  end
end
