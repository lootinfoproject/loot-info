class AddStandardToCollections < ActiveRecord::Migration[6.1]
  def change
    add_column :collections, :standard, :string
  end
end
