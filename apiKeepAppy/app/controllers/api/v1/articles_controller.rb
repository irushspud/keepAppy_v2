module Api
  module V1
    class ArticlesController < ApplicationController
=begin
      class Article < ::Article overwrites some information present in api articles model with information from the articles controller
      that was added initially. Migrations such as tag_list and image url are added here to the api
=end
      class Article < ::Article
        # Note: this does not take into consideration the create/update actions for changing released_on
        def as_json(options = {})
          super.merge(tags: tag_list, image_url: image.url.sub("api/v1/articles_controller/",""))
        end
      end
      ##user auth
      #before_filter :authenticate_user!
      respond_to :json
      #articles.json should be returned, but is returning old json object
      def index
        if params[:tag]
          respond_with Article.tagged_with(params[:tag], :any => true).limit(5).shuffle 
	  #returns a random set of articles containing appropriate tags and a limit of 5 so as not to take up used data
        else
          respond_with Article.all
        end
      end
      def tag
        respond_with Article.tagged_with(params[:tag])
      end
      private
      def set_article
        @article = Article.find(params[:id])
      end

      def article_params
        params.require(:article).permit(:title,:content,:author,:classification,:image, :tag_list)
      end
    end
  end
end
