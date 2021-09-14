class DatabaseRefactoring < ActiveRecord::Migration[6.1]
  def change
    add_reference :nft_collections, :project
    add_reference :projects, :project
    add_column :nft_collections, :url, :string
    add_column :smart_contracts, :url, :string
    remove_column :smart_contracts, :title, :string
    remove_column :nft_collections, :name, :string

    rename_table :nft_collections, :collections
    rename_table :smart_contracts, :contracts
  end
end
