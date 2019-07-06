module Images
  class UploadsController < ApplicationController
    def create
      uploader = ImageUploader.new(:cache)
      @file = uploader.upload(upload_params)
      render json: @file
    end

    private

    def upload_params
      params["files"].first
    end
  end
end
