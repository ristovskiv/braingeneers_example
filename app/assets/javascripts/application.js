// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require_tree .

function csrfToken () {
  var $meta = $('meta[name=csrf-token]')

  if ($meta.length) {
    return $meta.attr('content')
  }
}

function fileUpload(fileInput) {
  var formGroup = fileInput.parentNode
  var data = fileInput.dataset


  var uppy = Uppy.Core({
      id: fileInput.id,
      autoProceed: true,
      restrictions: {
        allowedFileTypes: fileInput.accept.split(','),
      }
    })
    .use(Uppy.XHRUpload, {
      endpoint: '/images/upload', // Shrine's upload endpoint
      headers: {
        'X-CSRF-Token': csrfToken()
      }
    })
    .use(Uppy.FileInput, {
      target: formGroup,
      replaceTargetContent: true,
    })
    .use(Uppy.ThumbnailGenerator, {
      thumbnailWidth: 200,
    })

  uppy.on('file-added', function (file) {
    var time = new Date().getTime();
    var regexp = new RegExp(data.id, 'g');

    uppy.setFileState(
      file.id,
      {
        partialId: time,
        partialToPrepend: $(data.fields.replace(regexp, time))
      }
    )
  })

  uppy.on('upload-success', function (file, response) {
    var uploadedFileData = JSON.stringify(response.body)
    // set hidden field value to the uploaded file data so that it's submitted with the form as the attachment
    // var hiddenInput = document.getElementById(fileInput.dataset.uploadResultElement)
    // hiddenInput.value = uploadedFileData
    // console.log('upload-success file -> ', file)
    file
      .partialToPrepend
      .find('input[name="album[photos_attributes][' + file.partialId + '][image]"]')
      .val(uploadedFileData)
    file
      .partialToPrepend
      .find('input[name="album[photos_attributes][' + file.partialId + '][model]"]')
      .val(response.body.metadata.model)
    $('.photos').prepend(file.partialToPrepend);

  })

  uppy.on('thumbnail:generated', function (file, preview) {
    // console.log('thumbnail:generated file ->', file)
    // console.log('thumbnail:generated preview ->', preview)
    file.partialToPrepend.find('img').attr('src', preview);
    // console.log('thumbnail:generated file.partialToPrepend -> ', file.partialToPrepend)
  })
}

$(document).on('turbolinks:load', function() {

  $('form').on('click', '.remove_record', function(event) {
    $(this).prev('input[type=hidden]').val('1');
    $(this).closest('.col-md-6').hide();
    return event.preventDefault();
  });

  // $('form').on('click', '.add_fields', function(event) {
  //   var regexp, time;
  //   time = new Date().getTime();
  //   regexp = new RegExp($(this).data('id'), 'g');
  //   $('.fields').append($(this).data('fields').replace(regexp, time));
  //   return event.preventDefault();
  // });


  $('input[type=file]').each(function (index, fileInput) {
    fileUpload(fileInput)
  });

});
