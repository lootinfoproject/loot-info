namespace :data_import do
  desc 'initial application setup with data'
  task initial_setup: :environment do
    [
      {
        title: 'Loot',
        nft_collection: {
          collection_url: 'https://opensea.io/collection/lootproject'
        },
        smart_contract: {
          contract_url: 'https://etherscan.io/address/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7',
          address: '0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7'
        },
        referral_projects: [
          {
            title: 'Realms (for Adventurers)',
            nft_collection: { collection_url: 'https://opensea.io/collection/lootrealms' },
            smart_contract: {
              contract_url: 'https://etherscan.io/address/0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d',
              address: '0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d'
            }
          },
          {
            title: 'Adventure Gold',
            smart_contract: {
              contract_url: 'https://etherscan.io/address/0x32353a6c91143bfd6c7d363b546e62a9a2489a20',
              address: '0x32353A6C91143bfd6C7d363B546e62a9A2489A20'
            }
          },
          {
            title: 'Ability Score',
            nft_collection: { collection_url: 'https://opensea.io/collection/ability-score' },
            smart_contract: {
              contract_url: 'https://etherscan.io/address/0x42a87e04f87a038774fb39c0a61681e7e859937b',
              address: '0x42a87e04f87a038774fb39c0a61681e7e859937b'
            }
          },
          {
            title: 'Abstract Loot',
            nft_collection: { collection_url: 'https://opensea.io/collection/abstract-loot' },
            smart_contract: {
              contract_url: 'https://etherscan.io/address/0xcc56775606730c96ea245d9cf3890247f1c57fb1',
              address: '0xcc56775606730c96ea245d9cf3890247f1c57fb1'
            }
          },
          {
            title: 'Characters',
            nft_collection: { collection_url: 'https://opensea.io/collection/characters-for-loot' },
            smart_contract: {
              contract_url: 'https://etherscan.io/address/0x7403ac30de7309a0bf019cda8eec034a5507cbb3',
              address: '0x7403ac30de7309a0bf019cda8eec034a5507cbb3'
            }
          }
        ]
      }
    ].each do |project_attributes|
      def create_project(attrs)
        ether_client = Etherscan::Client.new
        project = Project.create!(title: attrs[:title])

        NFTCollection.create!(project: project, **attrs[:nft_collection]) if attrs[:nft_collection]

        contract_abi = ether_client.getabi(attrs[:smart_contract][:address])
        sleep 0.2 # we can request no more than 5 times per second
        SmartContract.create!(abi: contract_abi, project: project, **attrs[:smart_contract])

        project
      end

      ActiveRecord::Base.transaction do
        project = create_project(project_attributes)

        project_attributes[:referral_projects].each do |referral_project_attributes|
          referral_project = create_project(referral_project_attributes)

          referral_project.update!(project: project)
        end
      end
    end
  end
end
