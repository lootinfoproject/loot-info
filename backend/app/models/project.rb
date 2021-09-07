class Project < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: %i[slugged finders]

  has_many :smart_contracts, dependent: :destroy
end
