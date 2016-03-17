module Api
  module V1
    class ArticlesController < ApplicationController
     
      respond_to :json
      #articles.json should be returned, but is returning old json object
      def index
        respond_with Article.all
      end
     
      private
      def set_article
        @article = Article.find(params[:id])
      end
      
      def article_params
        params.require(:article).permit(:title,:content,:author,:classification,:image)
      end
    end
  end
end
