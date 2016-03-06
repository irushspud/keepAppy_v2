json.array!(@post) do |public_post|
  json.extract! article, :id, :post, :rate
  json.url public_post_url(post, format: :json)
end
