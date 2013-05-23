class Post < ActiveRecord::Base
  include Tire::Model::Search
  include Tire::Model::Callbacks
  attr_accessible :name, :content, :created_at
end
