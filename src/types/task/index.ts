export enum TASK_TYPE_ROLE {
  // TASK_COLLECT_LINKS = "collect_links",
  TASK_CONDUCT_RESEARCH = "conduct_research",
  TASK_FILE_UPLOAD = "file_upload",
  TASK_CONDUCT_DEBATE = "debate",
  // TASK_WEB_SEARCH = "web_search",
  TASK_COMPOSE_IMAGE = "generate_image",
  TASK_COMPOSE_AUDIO = "generate_audio",
  // TASK_COMPOSE_AUDIO_SCRIPT = "generate_audio_script",
  TASK_COMPOSE_CONTENT = "generate_content",
  TASK_DATA_COLLECTION = "data_collection",
  TASK_CUSTOM_CONTENT = "custom_content",
  TASK_CRAWL_CONTENT = "crawl_content",
  TASK_CHART_QUERY_JSON = "chart_query_json",
}

export const SESSION_ASSETS = [
  "user",
  "assistant",
  ...Object.values(TASK_TYPE_ROLE),
];
