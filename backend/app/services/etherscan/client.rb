module Etherscan
  class Client < Utils::HttpClient
    API_URL = URI('https://api.etherscan.io/api')
    HEADERS = [
      'Content-Type' => 'application/x-www-form-urlencoded'
    ].freeze

    def initialize
      super(uri: API_URL, headers: HEADERS)
    end

    private

    def default_query_params
      {
        apikey: ENV['etherscan_api_key']
      }
    end
  end
end
