class ImageUploader < Shrine
  ALLOWED_TYPES = %w[image/jpeg image/png]

  plugin :upload_endpoint
  plugin :validation_helpers
  plugin :remove_invalid
  plugin :add_metadata

  metadata_method :model

  add_metadata do |io, context|
    begin
      exif_data = Shrine.with_file(io) { |file| Exif::Data.new(io) }
      { model: exif_data.model }
    rescue Exif::NotReadable
      {}
    end
  end

  Attacher.validate do
    validate_mime_type_inclusion ALLOWED_TYPES
    validate_max_size 5*1024*1024
  end
end
