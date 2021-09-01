module OpenSea
  class Client
    include Actions::Assets

    attr_reader :http_client

    API_URL = URI('https://api.opensea.io/api/v1/')
    DEFAULT_HEADERS = [
      { 'X-API-KEY' => ENV['OPEN_SEA_API_KEY'] }
    ].freeze

    def initialize
      @http_client = Utils::HttpClient.new(uri: API_URL, headers: DEFAULT_HEADERS)
    end

    def self.new
      super.http_client
    end
  end
end
