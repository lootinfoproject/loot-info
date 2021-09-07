class AddAbiToSmartContracts < ActiveRecord::Migration[6.1]
  def change
    add_column :smart_contracts, :abi, :text
  end
end
