class DatabaseRefactoring < ActiveRecord::Migration[6.1]
  def change
    add_reference :nft_collections, :project
    add_reference :projects, :project
    add_column :nft_collections, :collection_url, :string
    add_column :smart_contracts, :contract_url, :string
    remove_column :smart_contracts, :title
    remove_column :nft_collections, :name
  end
end
