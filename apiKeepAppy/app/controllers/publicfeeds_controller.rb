class PublicfeedsController < ApplicationController
  before_filter :authenticate_user! 
  before_action :set_publicfeed, only: [:show, :edit, :update, :destroy]
  #load_and_authorize_resource #checks roll permissions of User
  # GET /publicfeeds
  # GET /publicfeeds.json
  def index
    @publicfeeds = Publicfeed.all 
  end

  # GET /publicfeeds/1
  # GET /publicfeeds/1.json
  def show
  end

  # GET /publicfeeds/new
  def new
    @publicfeed = Publicfeed.new
  end

  # GET /publicfeeds/1/edit
  def edit
  end

  # POST /publicfeeds
  # POST /publicfeeds.json
  def create
    @publicfeed = Publicfeed.new(publicfeed_params)

    respond_to do |format|
      if @publicfeed.save
        format.html { redirect_to @publicfeed, notice: 'Publicfeed was successfully created.' }
        format.json { render :show, status: :created, location: @publicfeed }
      else
        format.html { render :new }
        format.json { render json: @publicfeed.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /publicfeeds/1
  # PATCH/PUT /publicfeeds/1.json
  def update
    respond_to do |format|
      if @publicfeed.update(publicfeed_params)
        format.html { redirect_to @publicfeed, notice: 'Publicfeed was successfully updated.' }
        format.json { render :show, status: :ok, location: @publicfeed }
      else
        format.html { render :edit }
        format.json { render json: @publicfeed.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /publicfeeds/1
  # DELETE /publicfeeds/1.json
  def destroy
    @publicfeed.destroy
    respond_to do |format|
      format.html { redirect_to publicfeeds_url, notice: 'Publicfeed was successfully destroyed.' }
      format.json { head :no_content }
    end
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
