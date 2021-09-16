class AddDescriptionAndImageUrlToProjects < ActiveRecord::Migration[6.1]
  def change
    add_column :projects, :description, :text
    add_column :projects, :image_url, :string
  end
end
