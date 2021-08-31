Rails.autoloaders.each do |autoloader|
  autoloader.inflector.inflect(
    'customer_io' => 'CustomerIO'
  )
end
