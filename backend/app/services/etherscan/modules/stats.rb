module Etherscan
  module Modules
    module Stats
      def tokensupply(contract_address)
        response = get('', { query_params: { module: 'stats', action: 'tokensupply', contractaddress: contract_address } })

        response['result']
      end
    end
  end
end
