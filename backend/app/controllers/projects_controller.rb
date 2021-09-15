class ProjectsController < ApiController
  def index
    projects = Project.includes(:contract, :collection, derivative_projects: %i[contract collection])
                      .where(project_id: nil)

    render json: projects.as_json(include: [:contract,
                                            :collection,
                                            { derivative_projects: { include: %i[contract collection] } }])
  end
end
