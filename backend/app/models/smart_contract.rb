class SmartContract < ApplicationRecord
  belongs_to :project, optional: true
end
