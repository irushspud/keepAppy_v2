json.array!(@publicfeeds) do |publicfeed|
  json.extract! publicfeed, :id, :title,:content, :rate
  json.url publicfeed_url(publicfeed, format: :json)
end
