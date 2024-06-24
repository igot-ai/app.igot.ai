import { AGENT_TASKS, DATA_TASKS } from "@/constants";
import {
  AreaChart,
  AudioLines,
  DatabaseZap,
  FileSearch,
  Image,
  Search,
  Text,
  Video,
  Webhook,
} from "lucide-react-native";

export const TASK_ICONS: Record<string, any> = {
  [AGENT_TASKS.SYSTEM_COMPOSE]: Text,
  [AGENT_TASKS.SYSTEM_CRAWL_ANALYSE]: FileSearch,
  [AGENT_TASKS.SYSTEM_SEARCH_ENGINE]: Search,
  [AGENT_TASKS.SYSTEM_COMPOSE_AUDIO]: AudioLines,
  [AGENT_TASKS.SYSTEM_COMPOSE_IMAGE]: Image,
  [AGENT_TASKS.SYSTEM_COMPOSE_VIDEO]: Video,
  [DATA_TASKS.SYSTEM_INTEGRATION_HTTP]: Webhook,
  [DATA_TASKS.SYSTEM_SQL_ANALYSIS]: DatabaseZap,
  [DATA_TASKS.SYSTEM_SQL_INSIGHT]: AreaChart,
};
