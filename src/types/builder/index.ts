export enum FLOW_FUNC {
  BOT = "BOT",
  IDEATION = "IDEATION",
}

export interface Snapshot {
  greeting: string;
  logo: string;
  cover: string;
  model: string;
  name: string;
  bio: string;
}
export interface Builder {
  name: string;
  context_id: string;
  user_id: string;
  ws_id: string;
  flow_func: FLOW_FUNC;
  original_context: string;
  query: string;
  label?: string[];
  snapshot: Snapshot;
  metrics: Metrics;
  tasks: Task[];
}

export interface Task {
  action: Action;
  order: number;
  depend_task_order: number[];
  ref: string;
  topics: any[];
  usages: number;
  task_config: TaskConfig;
  tool_name: string;
}

export interface GetBuilder {
  contextId?: string;
};

export interface Search {
  id: string;
  collection: string;
  similarity: number;
};

interface Action {
  type: string;
  content: string;
  goal: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

interface TaskConfig {
  references: string[];
  models: ModelsConfig;
  model: string;
  temperature: number;
  top_k: number;
  language?: string;
  format?: FormatOption;
  color: string;
  audio_model: string;
  voice: string;
  headers: object;
}

interface ModelsConfig {
  default: string;
  options: ModelOption[];
  collect_links: string;
  web_search: string;
  conduct_research: string;
}

interface ModelOption {
  value: string;
  label: string;
}

interface FormatOption {
  value: string;
  sample_output: string;
}

interface Metrics {
  number_of_tasks: number;
  number_of_task_data: number;
}
