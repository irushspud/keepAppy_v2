require 'test_helper'

class PublicfeedsControllerTest < ActionController::TestCase
  setup do
    @publicfeed = publicfeeds(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:publicfeeds)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create publicfeed" do
    assert_difference('Publicfeed.count') do
      post :create, publicfeed: { rate: @publicfeed.rate, title: @publicfeed.title }
    end

    assert_redirected_to publicfeed_path(assigns(:publicfeed))
  end

  test "should show publicfeed" do
    get :show, id: @publicfeed
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @publicfeed
    assert_response :success
  end

  test "should update publicfeed" do
    patch :update, id: @publicfeed, publicfeed: { rate: @publicfeed.rate, title: @publicfeed.title }
    assert_redirected_to publicfeed_path(assigns(:publicfeed))
  end

  test "should destroy publicfeed" do
    assert_difference('Publicfeed.count', -1) do
      delete :destroy, id: @publicfeed
    end

    assert_redirected_to publicfeeds_path
  end
end
