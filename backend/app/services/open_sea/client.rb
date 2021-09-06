module OpenSea
  class Client < Utils::HttpClient
    include Actions::Assets

    API_URL = URI('https://api.opensea.io/api/v1/')
    DEFAULT_HEADERS = [
      { 'X-API-KEY' => ENV['OPEN_SEA_API_KEY'] }
    ].freeze

    def initialize
      super(uri: API_URL, headers: DEFAULT_HEADERS)
    end
  end
end
