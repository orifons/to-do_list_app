import axios from "axios";

export type ApiError = {
  message: string;
  fieldErrors: Record<string, string>;
};

function extractMessages(value: unknown): string[] {
  if (typeof value === "string") {
    return value.trim() ? [value.trim()] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(extractMessages);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const message = record.message ?? record.detail;
    if (message !== undefined) {
      return extractMessages(message);
    }

    return Object.values(record).flatMap(extractMessages);
  }

  return [];
}

export function getApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    return {
      message: "Ocurrió un error inesperado. Inténtalo de nuevo.",
      fieldErrors: {},
    };
  }

  if (!error.response) {
    return {
      message: "No pudimos conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.",
      fieldErrors: {},
    };
  }

  if (error.response.status >= 500) {
    return {
      message: "El servidor tuvo un problema. Inténtalo de nuevo más tarde.",
      fieldErrors: {},
    };
  }

  const data: unknown = error.response.data;
  const fieldErrors: Record<string, string> = {};
  const generalMessages: string[] = [];

  if (data && typeof data === "object" && !Array.isArray(data)) {
    for (const [field, value] of Object.entries(data)) {
      const messages = extractMessages(value);
      if (field === "detail" || field === "message" || field === "non_field_errors") {
        generalMessages.push(...messages);
      } else if (messages.length > 0) {
        fieldErrors[field] = messages.join(" ");
      }
    }
  } else {
    generalMessages.push(...extractMessages(data));
  }

  if (generalMessages.length === 0 && Object.keys(fieldErrors).length === 0) {
    generalMessages.push(
      error.response.status === 401
        ? "No se pudo iniciar sesión. Revisa tus credenciales."
        : "No se pudo completar la solicitud. Inténtalo de nuevo."
    );
  }

  return {
    message: generalMessages.join(" "),
    fieldErrors,
  };
}
