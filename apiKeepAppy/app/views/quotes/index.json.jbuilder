json.array!(@quotes) do |quote|
  json.extract! quote, :id, :cite, :progenitor, :classification, :tag_list
  json.url quote_url(quote, format: :json)
end
