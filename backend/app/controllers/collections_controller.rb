class CollectionsController < ApplicationController
  def index
    collections = NFTCollection.all

    render json: collections
  end
end
