class PublicPostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
	
  #GET /publicposts
  #GET /publicpost.json

  def index
    @post = Public_Post.all
  end

  #GET /publicposts/1
  #GET /publicpost/1.json
  def show
  end

  #GET /publicpost/1/edit
  def edit
  end 
  def new
    @post = Public_Post.new
  end

  # POST /publicposts
  # POST /publicposts.json
  def create
    @post = Public_Post.new(public_post_params)
    respond_to do |format|
      if @post.save 
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @post }
      else
	format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
  end
  end

  # PATCH/PUT /publicposts/1
  # PATCH/PUT /publicposts/1.json
  def update
    respond_to do |format|
      if @post.update(public_post_params)
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
      	format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end
	
  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to articles_url, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Public_Post.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def public_post_params
    params.require(:post).permit(:post, :rate)
  end
end
