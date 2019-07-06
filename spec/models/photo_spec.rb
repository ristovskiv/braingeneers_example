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

require 'rails_helper'

RSpec.describe Photo, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
