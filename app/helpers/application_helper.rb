module ApplicationHelper
  def link_to_add_row(name, f, association, **args)
    new_object = f.object.send(association).klass.new
    id = new_object.object_id
    fields = f.simple_fields_for(association, new_object, child_index: id) do |builder|
      render(association.to_s.singularize, f: builder)
    end
    link_to(name, '#', class: "add_fields " + args[:class], data: {id: id, fields: fields.gsub("\n", "")})
  end

  def photos_field(f)
    new_object = f.object.send(:photos).klass.new
    id = new_object.object_id
    fields = f.fields_for(:photos, new_object, child_index: id) do |builder|
      render('photo', f: builder)
    end

    f.file_field(
      :photos,
      multiple: true,
      accept: ImageUploader::ALLOWED_TYPES.join(","),
      data: { id: id, fields: fields.gsub("\n", "") }
    )
  end
end
