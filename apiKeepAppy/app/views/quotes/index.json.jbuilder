json.array!(@quotes) do |quote|
  json.extract! quote, :id, :cite, :progenitor, :classification
  json.url quote_url(quote, format: :json)
end
