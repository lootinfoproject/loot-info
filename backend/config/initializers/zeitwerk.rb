Rails.autoloaders.each do |autoloader|
  autoloader.inflector.inflect(
    'nft_collection' => 'NFTCollection'
  )
end
