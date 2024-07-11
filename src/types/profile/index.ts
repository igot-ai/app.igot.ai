export type Gender = "male" | "female" | "other";

export enum Tier {
  FREE = "free_trial",
  PREMIUM = "premium",
}

export interface Profile {
  name: string;
  avatar_url: string;
  title: string;
  description: string;
  gender: Gender;
  interested_in: string[];
}

export interface Me extends Profile {
  id: string;
  email: string;
  tier: Tier;
  joined_at: string;
  ws_id: string;
}
