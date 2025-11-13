class AdsController < ApplicationController
  before_action :require_login, except: %i[index show]
  before_action :set_ad, only: %i[show edit update destroy]
  before_action :authorize_owner!, only: %i[edit update destroy]

  def index
    @ads = Ad.includes(:user).recent
  end

  def show; end

  def new
    @ad = current_user.ads.build
  end

  def create
    @ad = current_user.ads.build(ad_params)

    if @ad.save
      redirect_to @ad, notice: "Ad created successfully."
    else
      flash.now[:alert] = "Please fix the errors below."
      render :new, status: :unprocessable_entity
    end
  end

  def edit; end

  def update
    if @ad.update(ad_params)
      redirect_to @ad, notice: "Ad updated successfully."
    else
      flash.now[:alert] = "Please fix the errors below."
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @ad.destroy
    redirect_to ads_path, notice: "Ad deleted."
  end

  private

  def set_ad
    @ad = Ad.find(params[:id])
  end

  def authorize_owner!
    require_owner(@ad)
  end

  def ad_params
    params.require(:ad).permit(:title, :description, :price)
  end
end
