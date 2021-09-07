namespace :data_import do
  desc 'add smart contract to the existing project'
  task :add_contract_to_project, %i[project_title contract_title contract_address] => :environment do |_task, args|
    project = Project.find_by(title: args.project_title)

    project.smart_contracts.find_or_create_by!(title: args.contract_title) do |contract|
      contract.address = args.contract_address
      contract.abi = Etherscan::Client.new.getabi(contract.address)
    end
  end
end
