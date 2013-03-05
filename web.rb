require 'sinatra'
require 'slim'
require 'json'
require 'mongo'

include Mongo

configure do
  if ENV['MONGOHQ_URL']
    ENV['MONGODB_URI'] = ENV['MONGOHQ_URL']
    dbstr = ENV['MONGOHQ_URL'].split('/')[-1]
    set :mongo_db, MongoClient.new.db(dbstr)
  else
    set :mongo_db, MongoClient.new.db('local')
  end
end

get '/' do
  slim :index
end

get '/:username' do
  @username = params[:username]
  @streamentries = []
  settings.mongo_db[@username].find.to_a.each do |entry|
    @streamentries << Struct.new(:title, :album, :artist)
      .new(entry["title"], entry["album"], entry["artist"])
  end
  slim :user
end

get '/:username/stream' do
  content_type :json
  settings.mongo_db[params[:username]].find.to_a.to_json
end

post '/' do
  content_type :json
  { :success => true }.to_json
end
