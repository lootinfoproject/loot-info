module Etherscan
  class Client < Utils::HttpClient
    API_URL = URI('https://api.etherscan.io/api')

    def initialize
      super(uri: API_URL)
    end

    private

    def apply_default_settings(request, params)
      params[:apikey] = ENV['etherscan_api_key']

      super(request, params)
    end
  end
end
