module CoinMarketCap
  class Client < Utils::HttpClient
    include Actions::CryptoCurrency

    API_URL = URI('https://pro-api.coinmarketcap.com/v1')
    HEADERS = [
      'Accept' => 'application/json',
      'X-CMC_PRO_API_KEY' => ENV['COIN_MARKET_CAP_API_KEY']
    ].freeze

    def initialize
      super(uri: API_URL, headers: HEADERS)
    end
  end
end
