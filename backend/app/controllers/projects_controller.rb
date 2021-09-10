class ProjectsController < ApplicationController
  def index
    projects = Project.includes(:smart_contract, :nft_collection, referral_projects: %i[smart_contract nft_collection])
                      .where(project_id: nil)

    render json: projects.as_json(include: [:smart_contract,
                                            :nft_collection,
                                            { referral_projects: { include: %i[smart_contract nft_collection] } }])
  end
end
