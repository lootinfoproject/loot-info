module CoinMarketCap
  module Actions
    module CryptoCurrency
      def latest_token_price(project)
        resp = get('/cryptocurrency/quotes/latest', query_params: { slug: project.slug })

        resp['data'].first[1]['quote']['USD']['price'].round(2)
      rescue => e
        Rails.logger.error("Error featching price for the collection #{project.title} --- #{e}")

        nil
      end
    end
  end
end
