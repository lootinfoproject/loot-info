module Etherscan
  class Client < Utils::HttpClient
    include Modules::Contract
    include Modules::Stats
    include Modules::Token

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
