module Api
  module V1
    class ArticlesController < ApplicationController
      respond_to :json

      def index
        respond_with Article.all
      end


      def show
      end

      def new
        resopnd_with  Article.new
      end


      def edit
      end

      def create
        respond_with Article.create(params[:product])
      end

      def update
        respond_with Article.udpate(params[:id], params[:article])
      end

      def destroy
        respond_with Article.destroy(params[:id])
      end

      private
      # Use callbacks to share common setup or constraints between actions.
      def set_article
         @article = Article.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def article_params
        params.require(:article).permit(:title, :content, :author, :clssificaton,:image)
      end
    end
  end
end
