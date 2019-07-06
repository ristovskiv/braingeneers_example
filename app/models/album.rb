# == Schema Information
#
# Table name: albums
#
#  id         :bigint           not null, primary key
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Album < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_many :photos, dependent: :destroy
  accepts_nested_attributes_for :photos, allow_destroy: true
end
