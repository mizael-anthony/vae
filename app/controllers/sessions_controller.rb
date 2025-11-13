class SessionsController < ApplicationController
  def new
    redirect_to ads_path, notice: "You are already signed in." if logged_in?
  end

  def create
    user = User.find_by(email: session_params[:email].to_s.downcase)

    if user&.authenticate(session_params[:password])
      session[:user_id] = user.id
      redirect_to ads_path, notice: "Signed in successfully."
    else
      flash.now[:alert] = "Invalid email or password."
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    reset_session
    redirect_to new_session_path, notice: "Signed out successfully."
  end

  private

  def session_params
    params.require(:session).permit(:email, :password)
  end
end
