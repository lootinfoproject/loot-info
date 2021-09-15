class CollectionsController < ApiController
  def index
    collections = NFTCollection.all

    render json: collections
  end
end
