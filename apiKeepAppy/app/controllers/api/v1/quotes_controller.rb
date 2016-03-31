module Api
  module V1
    class QuotesController < ApplicationController

      class Quote < ::Quote
        # Note: this does not take into consideration the create/update actions for changing released_on
        def as_json(options = {})
          super.merge(tags: tag_list)  #appends tag_list to the api json object
        end
      end
      ##user auth
      #before_filter :authenticate_user!
      respond_to :json
      #articles.json should be returned, but is returning old json object
      def index
        if params[:tag]
          respond_with Quote.tagged_with(params[:tag])
        else
          respond_with Quote.all
        end
      end
      def tag
        respond_with Quote.tagged_with(params[:tag])
      end

      private
      def set_article
        @article = Quote.find(params[:id])
      end

      def quote_params
      params.require(:quote).permit(:cite, :progenitor, :classification, :tag_list)
    end
    end
  end
end
