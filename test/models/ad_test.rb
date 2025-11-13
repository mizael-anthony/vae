require "test_helper"

class AdTest < ActiveSupport::TestCase
  setup do
    @user = User.create!(email: "owner@example.com", password: "password", password_confirmation: "password")
  end

  test "is valid with default attributes" do
    ad = @user.ads.build(title: "Sample", price: 19.99, description: "A great deal")

    assert ad.valid?
  end

  test "requires a title" do
    ad = @user.ads.build(title: "", price: 5)

    assert ad.invalid?
    assert_includes ad.errors[:title], "can't be blank"
  end

  test "requires non-negative price" do
    ad = @user.ads.build(title: "Cheap", price: -1)

    assert ad.invalid?
    assert_includes ad.errors[:price], "must be greater than or equal to 0"
  end
end
