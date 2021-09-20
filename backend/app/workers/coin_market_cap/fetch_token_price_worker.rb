module CoinMarketCap
  class FetchTokenPriceWorker
    include Sidekiq::Worker

    def perform
      client = Client.new

      Collection.includes(:project).where(standard: 'ERC-20').find_in_batches do |collections|
        collections.each do |collection|
          sync_price(client, collection)
        rescue => e
          Rails.logger.error("Error featching price for the collection #{collection.project.title} --- #{e}")
        end
      end
    end

    private

    def sync_price(client, collection)
      current_price = client.latest_token_price(collection.project)

      collection.update!(previous_floor: collection.current_floor, current_floor: current_price)
    end
  end
end
