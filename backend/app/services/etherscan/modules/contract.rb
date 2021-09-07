module Etherscan
  module Modules
    module Contract
      def getabi(address)
        response = get('', { query_params: { module: 'contract', action: 'getabi', address: address } })

        response['result']
      end
    end
  end
end
