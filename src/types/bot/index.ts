export interface UpdateBotConfig {
  context_id?: string;
  name: string;
  label: string[];
  alias: string;
  key_configs: Partial<BotProfileForm>;
}

export interface BotProfileForm {
  bio: string;
  model: string;
  greeting: string;
  logo: string;
  cover: string;
}

export interface Bot {
  id: string;
  title: string;
  description: string;
}

