json.array!(@articles) do |article|
  json.extract! article, :id, :title, :content, :author, :clssificaton, :image,:image.url
  json.url article_url(article, format: :json)
end
