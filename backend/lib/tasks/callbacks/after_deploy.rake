namespace :callbacks do
  desc 'after heroku deploy callback'
  task after_deploy: :environment do
    def create_project(attrs)
      ether_client = Etherscan::Client.new
      project = Project.find_or_initialize_by(title: attrs['title'])
      project.assign_attributes(description: attrs['description'], image_url: attrs['image_url'])
      project.save!

      if attrs['collection']
        if project.collection
          project.collection.update!(**attrs['collection'])
        else
          Collection.create!(project: project, **attrs['collection'])
        end
      else
        project.collection&.destroy!
      end

      if attrs['contract']
        if project.contract
          project.contract.update!(**attrs['contract'])
        else
          contract_abi = ether_client.getabi(attrs['contract']['address'])
          sleep 0.2 # we can request no more than 5 times per second
          Contract.create!(abi: contract_abi, project: project, **attrs['contract'])
        end
      else
        project.contract&.destroy!
      end

      project
    end

    projects_data = JSON.parse(File.read('./lib/data/projects_data.json'))
    projects_data.each do |project_attributes|
      ActiveRecord::Base.transaction do
        project = create_project(project_attributes)

        project_attributes['derivative_projects'].each do |referral_project_attributes|
          referral_project = create_project(referral_project_attributes)

          referral_project.update!(project: project)
        end
      end
    end
  end
end
