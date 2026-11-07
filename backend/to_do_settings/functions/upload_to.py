import os
from datetime import datetime


def set_filename_forat(now, filename):
    return "{date}-{microsecond}{extension}".format(
        date=str(now.date()),
        microsecond=now.microsecond,
        extension=os.path.splitext(filename)[1]
    )


def file_directory_path(instance, filename, **kwargs):
    path_final = "/{filename}"
    data = kwargs.get('data', [])

    from unidecode import unidecode
    now = datetime.now()
    directory = instance._meta.app_label
    model = instance._meta.verbose_name
    filename = set_filename_forat(now, filename)
    pre_path_array = "{directory}/{model}"
    for d in data:
        pre_path_array = pre_path_array + "/" + str(getattr(instance, d))
    pre_path_array = pre_path_array + path_final
    path = unidecode(pre_path_array.format(directory=directory, model=model, filename=filename))
    return path
