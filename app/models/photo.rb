# == Schema Information
#
# Table name: photos
#
#  id         :bigint           not null, primary key
#  image_data :text
#  model      :string
#  album_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Photo < ApplicationRecord
  belongs_to :album

  include ImageUploader::Attachment.new(:image)
end
