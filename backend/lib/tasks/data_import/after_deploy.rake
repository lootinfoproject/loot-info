namespace :data_import do
  desc 'initial application setup with data'
  task after_deploy: :environment do
    def create_project(attrs)
      ether_client = Etherscan::Client.new
      project = Project.find_or_create_by!(title: attrs['title'])

      if attrs['nft_collection']
        if project.nft_collection
          project.nft_collection.update!(**attrs['nft_collection'])
        else
          NFTCollection.create!(project: project, **attrs['nft_collection'])
        end
      else
        project.nft_collection&.destroy!
      end

      if attrs['smart_contract']
        if project.smart_contract
          project.smart_contract.update!(**attrs['smart_contract'])
        else
          contract_abi = ether_client.getabi(attrs['smart_contract']['address'])
          sleep 0.2 # we can request no more than 5 times per second
          SmartContract.create!(abi: contract_abi, project: project)
        end
      else
        project.smart_contract&.destroy!
      end

      project
    end

    projects_data = JSON.parse(File.read('./lib/data/projects_data.json'))
    projects_data.each do |project_attributes|
      ActiveRecord::Base.transaction do
        project = create_project(project_attributes)

        project_attributes['referral_projects'].each do |referral_project_attributes|
          referral_project = create_project(referral_project_attributes)

          referral_project.update!(project: project)
        end
      end
    end
  end
end
