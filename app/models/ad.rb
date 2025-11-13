class Ad < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :price, numericality: { greater_than_or_equal_to: 0 }, presence: true

  scope :recent, -> { order(created_at: :desc) }
end
