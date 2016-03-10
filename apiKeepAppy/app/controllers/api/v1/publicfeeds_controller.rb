module Api
  module V1
    class PublicfeedsController < ApplicationController
      respond_to :json

      def index
        respond_with Publicfeed.all
      end

      def show
      end

      def new
        respond_with Publicfeed.new
      end

      def edit
      end

      def create
        respond_with Publicfeed.create(params[:publicfeed])
      end

      def update
        respond_with Publicfeed.update(params[:id], params[:publicfeed])
      end
   
      def destroy
        respond_with Publicfeed.destroy(params[:id])
      end

      private
      def set_publicfeed
         @publicfeed = Publicfeed.find(params[:id])
      end
      
      def publicfeed_params
        params.require(:publicfeed).permit(:title,:content,:rate)
      end
    end
  end
end
