require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "is valid with email and password" do
    user = User.new(email: "person@example.com", password: "password", password_confirmation: "password")

    assert user.valid?
  end

  test "requires unique email" do
    User.create!(email: "taken@example.com", password: "password", password_confirmation: "password")

    dup = User.new(email: "TAKEN@example.com", password: "password", password_confirmation: "password")

    assert dup.invalid?
    assert_includes dup.errors[:email], "has already been taken"
  end

  test "requires password of minimum length" do
    user = User.new(email: "short@example.com", password: "short", password_confirmation: "short")

    assert user.invalid?
    assert_includes user.errors[:password], "is too short (minimum is 8 characters)"
  end
end
