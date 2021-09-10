class NFTCollection < ApplicationRecord
  self.table_name = 'nft_collections'

  belongs_to :project
end
