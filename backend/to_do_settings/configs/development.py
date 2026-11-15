########################################################################################
# Configuración específica para el entorno de desarrollo.                              #
# Aquí puedes agregar configuraciones específicas para el entorno de desarrollo,       #
# como la configuración de la base de datos local, los middleware de depuración, etc.  #
########################################################################################
from ..settings import *

# Permite que Django reconozca el HTTPS que termina en Caddy.
SECURE_PROXY_SSL_HEADER = tuple(
    os.getenv("SECURE_PROXY_SSL_HEADER", "").split(", ")
)

# Caddy será quien redirija HTTP a HTTPS.
SECURE_SSL_REDIRECT = os.getenv("SECURE_SSL_REDIRECT", "False") == "True"

# Las cookies se enviarán únicamente mediante HTTPS.
SESSION_COOKIE_SECURE = os.getenv("SESSION_COOKIE_SECURE", "True") == "True"
CSRF_COOKIE_SECURE = os.getenv("CSRF_COOKIE_SECURE", "True") == "True"

# Evitamos activar HSTS durante el desarrollo local.
SECURE_HSTS_SECONDS = int(os.getenv("SECURE_HSTS_SECONDS", "0"))
SECURE_HSTS_INCLUDE_SUBDOMAINS = (
    os.getenv("SECURE_HSTS_INCLUDE_SUBDOMAINS", "False") == "True"
)
SECURE_HSTS_PRELOAD = os.getenv("SECURE_HSTS_PRELOAD", "False") == "True"
