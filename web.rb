require 'sinatra'
require 'slim'
require 'json'

get '/' do
  slim :index
end

post '/' do
  content_type :json
  { :success => true }.to_json
end
