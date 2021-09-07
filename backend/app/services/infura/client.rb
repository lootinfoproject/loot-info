module Infura
  class Client < Utils::HttpClient
    API_URL = URI("https://mainnet.infura.io/v3/#{ENV['infura_project_id']}")

    def initialize
      super(uri: API_URL)
    end

    private

    def apply_default_settings(request, params)
      super(request, params)

      request.basic_auth('', ENV['infura_project_secret'])
    end
  end
end
