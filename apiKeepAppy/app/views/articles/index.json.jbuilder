json.array!(@articles) do |article|

  json.url article_url(article, format: :json)
  json.url image_url(article.image)
  json.extract!    article, :id, :title, :content, :author,  :image, :tag_list

end
