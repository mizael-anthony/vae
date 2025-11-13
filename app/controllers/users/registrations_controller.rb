module Users
  class RegistrationsController < ApplicationController
    def new
      @user = User.new
    end

    def create
      @user = User.new(user_params)

      if @user.save
        session[:user_id] = @user.id
        redirect_to ads_path, notice: "Welcome aboard! Your account has been created."
      else
        flash.now[:alert] = "Please review the errors below."
        render :new, status: :unprocessable_entity
      end
    end

    private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
  end
end
