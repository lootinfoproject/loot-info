module Utils
  # http client object to make https requests to the external api
  class HttpClient
    SUPPORTED_REQUEST_TYPES = %i[patch get post put delete].freeze

    attr_reader :https, :headers, :uri

    # initializes client object
    #
    # uri - `URI`, object of the request host, example URI('https://api.vimeo.com')
    # headers - `Array`, array of key-value header pairs, that will be
    # included to each request
    def initialize(uri:, headers: [])
      @https = Net::HTTP.new(uri.host, uri.port)
      @uri = uri
      @https.use_ssl = true
      @headers = headers.map(&:to_a).flatten(1)
    end

    # builds methods on the fly, see supported request types (methods) above
    #
    # possible args
    # 1) - request path (can include url arguments)
    # 2) - hash parameters
    # 3) - optional block to customize request
    def method_missing(method, *args, &block)
      super unless respond_to_missing?(method)

      request = build_request_object(method, args[0])

      # default settings
      apply_default_settings(request, args[1])

      # custom settings
      yield request if block_given?

      resp = https.request(request)
      JSON.parse(resp.body) if resp.body.present?
    end

    def respond_to_missing?(method, include_private = false)
      SUPPORTED_REQUEST_TYPES.include?(method) || super
    end

    private

    def apply_default_settings(request, params)
      apply_headers(request)
      request.body = params.to_json if params
    end

    def apply_headers(request)
      headers.each do |header|
        request[header[0]] = header[1]
      end
    end

    def build_request_object(method, path_string)
      "Net::HTTP::#{method.capitalize}".constantize.new("#{uri.path}#{URI(path_string).path}")
    end
  end
end
