module OpenSea
  module Actions
    module Assets
      def assets_list(params)
        http_client.get("/assets?#{params.to_query}")
      end
    end
  end
end
