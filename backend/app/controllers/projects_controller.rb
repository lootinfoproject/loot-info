class ProjectsController < ApplicationController
  def index
    projects = Project.includes(:smart_contracts).all

    render json: projects.as_json(include: :smart_contracts)
  end
end
