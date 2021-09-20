class CollectionsController < ApiController
  before_action :set_collection, only: :current_price

  def index
    collections = Collection.all

    render json: collections
  end

  def current_price
    client = CoinMarketCap::Client.new
    price = client.latest_token_price(@collection.project)

    render json: price
  end

  private

  def set_collection
    @collection = Collection.find(params[:id])
  end
end
