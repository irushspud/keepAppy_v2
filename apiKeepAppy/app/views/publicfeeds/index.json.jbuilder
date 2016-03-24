json.array!(@publicfeeds) do |publicfeed|
  json.extract! publicfeed, :id, :title,:content
  json.url publicfeed_url(publicfeed, format: :json)
end
