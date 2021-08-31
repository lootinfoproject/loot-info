require 'rails_helper'

RSpec.describe Utils::HttpClient do
  subject { described_class.new(uri: OpenSea::Client::API_URL, headers: OpenSea::Client::DEFAULT_HEADERS) }

  describe '.new' do
    it 'initialize client object' do
      expect(subject).to be_kind_of(described_class)
      expect(subject.https).to be_kind_of(Net::HTTP)
    end
  end

  describe 'method_missing' do
    before { stub_vimeo_request }

    described_class::SUPPORTED_REQUEST_TYPES.each do |type|
      it "supports necessary #{type}" do
        expect { subject.send(type, '/test/url')}.to_not raise_error NoMethodError
      end
    end

    context 'request checks' do
      before do
        answer = double('answer', body: response.to_json)
        allow(subject.https).to receive(:request).and_return(answer)
      end
      let(:body) { { parameter1: 1, parameter2: 2} }
      let(:response) { { 'response' => 1 } }
      let(:test_path) { '/test/url' }

      it 'builds correct request' do
        expect(subject.https).to receive(:request)

        resp = subject.post(test_path, body) do |request|
          expect(request.body).to eq body.to_json
          expect(request.method).to eq 'POST'
          expect(request.path).to eq test_path
        end

        expect(resp).to eq response
      end
    end
  end
end
