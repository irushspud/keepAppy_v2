json.array!(@articles) do |article|
  json.url image_url(article.image.url)
  json.extract!    article, :id, :title, :content, :author, :clssificaton, :image
  json.url article_url(article, format: :json)

end
