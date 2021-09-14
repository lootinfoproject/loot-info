class Contract < ApplicationRecord
  belongs_to :project, optional: true
end
