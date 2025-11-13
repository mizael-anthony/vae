# This file seeds a demo user and a couple of ads for local development.

demo_user = User.find_or_create_by!(email: "demo@example.com") do |user|
  user.password = "password"
  user.password_confirmation = "password"
end

demo_user.ads.find_or_create_by!(title: "Vintage Road Bike") do |ad|
  ad.description = "Steel frame in excellent condition. Includes new tires."
  ad.price = 350
end

demo_user.ads.find_or_create_by!(title: "Standing Desk") do |ad|
  ad.description = "Adjustable height desk, 48\" wide, lightly used."
  ad.price = 180
end
