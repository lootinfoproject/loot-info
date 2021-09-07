namespace :data_import do
  desc 'create new project'
  task :create_project, %i[project_title] => :environment do |_task, args|
    Project.find_or_create_by!(title: args.project_title)
  end
end
