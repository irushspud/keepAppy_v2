module Api
  module V1
    class PublicfeedsController < ApplicationController
      respond_to :json
      ##user auth
      #before_filter :authenticate_user!
      def index
        respond_with Publicfeed.all
      end
      
      private
      # Use callbacks to share common setup or constraints between actions.
      def set_publicfeed
        @publicfeed = Publicfeed.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def publicfeed_params
        params.require(:publicfeed).permit(:title,:content, :rate)
      end
    end
  end
end
