module Etherscan
  module Modules
    module Token
      # PRO endpoint
      def tokeninfo(contract_address)
        response = get('', { query_params: { module: 'token', action: 'tokeninfo', contractaddress: contract_address } })

        response['result']
      end
    end
  end
end
