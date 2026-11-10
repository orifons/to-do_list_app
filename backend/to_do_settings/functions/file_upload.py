import os
import re
from datetime import datetime

from unidecode import unidecode

_INVALID_PATH_CHARS = re.compile(r'[<>:"/\\|?*{}\x00-\x1f]')


def set_filename_format(now, filename):
    basename = os.path.basename(str(filename or "upload"))
    return "{date}-{microsecond}{extension}".format(
        date=str(now.date()),
        microsecond=now.microsecond,
        extension=os.path.splitext(basename)[1].lower(),
    )


def safe_storage_component(value: str, *, max_len: int = 120) -> str:
    """Segmento de ruta seguro en Windows/Linux (sin : \\ / etc.)."""
    text = unidecode(str(value or "").strip())
    text = _INVALID_PATH_CHARS.sub("_", text)
    text = text.strip(" .")
    if not text:
        return "item"
    return text[:max_len]


def file_directory_path(instance, filename, **kwargs):
    """
    Ruta relativa de almacenamiento para FileField/ImageField.

    No usar str.format() sobre valores de usuario: nombres con «{filename}»
    o rutas Windows con «:» rompen os.path.join en Windows.
    """
    data = kwargs.get("data", [])
    model_name = instance._meta.verbose_name.lower().replace(" ", "_")
    now = datetime.now()
    safe_filename = set_filename_format(now, filename)

    parts = [safe_storage_component(model_name)]
    for field in data:
        parts.append(safe_storage_component(getattr(instance, field, "")))
    parts.append(safe_filename)

    return "/".join(parts)
