class CreateSmartContracts < ActiveRecord::Migration[6.1]
  def change
    create_table :smart_contracts do |t|
      t.string :address
      t.string :title
      t.string :slug, unique: true
      t.belongs_to :project
      t.timestamps
    end
  end
end
