module Api
  module V1
    class BaseController < ApplicationController
      #ensures api responds with json only
      respond_to :json
    end
  end
end
