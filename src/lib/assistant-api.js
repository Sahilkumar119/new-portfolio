const CHAT_PATH = '/api/assistant/chat';

function normalizeBaseUrl(rawValue) {
  if (!rawValue) return '';
  return String(rawValue).trim().replace(/\/+$/, '');
}

export function getAssistantChatUrl() {
  const baseUrl = normalizeBaseUrl(process.env.REACT_APP_ASSISTANT_API_URL);
  return baseUrl ? `${baseUrl}${CHAT_PATH}` : CHAT_PATH;
}
