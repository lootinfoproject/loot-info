class ProjectsController < ApplicationController
  def index
    projects = Project.includes(:contract, :collection, derivative_projects: %i[contract collection])

    render json: projects.as_json(include: [:contract,
                                            :collection,
                                            { derivative_projects: { include: %i[contract collection] } }])
  end
end
