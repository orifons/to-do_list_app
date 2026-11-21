#!/usr/bin/env bash

set -u

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

if [[ ! -f "$BACKEND_DIR/manage.py" || ! -f "$FRONTEND_DIR/package.json" ]]; then
	echo "Error: no se encontraron las carpetas backend y frontend esperadas." >&2
	exit 1
fi

VENV_ACTIVATE="$BACKEND_DIR/.venv/bin/activate"
if [[ ! -f "$VENV_ACTIVATE" ]]; then
	echo "Error: no se encontró el entorno virtual en '$VENV_ACTIVATE'." >&2
	exit 1
fi

source "$VENV_ACTIVATE"

for required_command in python pnpm; do
	if ! command -v "$required_command" >/dev/null 2>&1; then
		echo "Error: se requiere '$required_command' instalado y disponible en PATH." >&2
		exit 1
	fi
done

(cd "$BACKEND_DIR" && exec python manage.py runserver 0.0.0.0:8000 --settings to_do_settings.configs.development) &
BACKEND_PID=$!

(cd "$FRONTEND_DIR" && exec pnpm dev) &
FRONTEND_PID=$!

cleanup() {
	kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "Backend y frontend iniciados. Presiona Ctrl+C para detener ambos."
wait -n "$BACKEND_PID" "$FRONTEND_PID"
