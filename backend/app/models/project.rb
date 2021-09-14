class Project < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: %i[slugged finders]

  has_many :derivative_projects, class_name: 'Project'
  belongs_to :project, optional: true

  has_one :contract, dependent: :destroy
  has_one :collection, dependent: :destroy
end
