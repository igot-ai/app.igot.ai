export interface Search {
  id: string;
  collection: "BOT" | "IDEATION" | "TEMPLATE";
  similarity: number;
}
