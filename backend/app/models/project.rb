class Project < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: %i[slugged finders]

  has_many :referral_projects, class_name: 'Project'
  belongs_to :project, optional: true

  has_one :smart_contract
  has_one :nft_collection, class_name: 'NFTCollection'
end
