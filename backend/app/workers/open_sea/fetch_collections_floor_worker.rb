module OpenSea
  class FetchCollectionsFloorWorker
    include Sidekiq::Worker

    def perform
      client = Client.new

      Collection.each do |collection|
        params = collection_params(collection)

        asset = client.assets_list(params)['assets'][0]
        collection.update!(current_floor_price: asset['price'],
                           previous_floor_price: collection.current_floor_price)
      end
    end

    private

    def collection_params(collection)
      {
        collection: collection.name.downcase.gsub(' ', ''),
        order_by: 'sale_count',
        limit: 1,
        order_direction: 'asc'
      }
    end
  end
end
