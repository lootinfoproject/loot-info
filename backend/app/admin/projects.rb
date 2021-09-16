ActiveAdmin.register Project do
  includes :project, :collection, :contract

  permit_params :title, :slug, :project_id, :description, :image_url,
                collection_attributes: %i[id url],
                contract_attributes: %i[id url address]

  index do
    active_admin_config.resource_columns.each do |attribute|
      next if attribute == :description

      column attribute
    end

    column :description do |project|
      project.description.truncate(100)
    end

    actions
  end

  show do |project|
    attributes_table do
      active_admin_config.resource_columns.each do |attribute|
        row attribute
      end
    end

    panel 'Contract details' do
      attributes_table_for project.contract do
        row :url
        row :address
      end
    end

    if project.collection
      panel 'Collection details' do
        attributes_table_for project.collection do
          row :url
        end
      end
    end

    active_admin_comments
  end

  form do |f|
    f.inputs do
      f.input :title
      f.input :slug
      f.input :project_id, as: :select, collection: Project.where(project_id: nil).map { |pr| [pr.title, pr.id] }
      f.input :description
    end

    f.inputs 'Collection', for: [:collection, f.object.collection] do |col_f|
      col_f.input :id, as: :hidden
      col_f.input :url
    end

    f.inputs 'Contract', for: [:contract, f.object.contract] do |con_f|
      con_f.input :id, as: :hidden
      con_f.input :url
      con_f.input :address
    end

    f.actions
  end
end
