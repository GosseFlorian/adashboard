export interface Theme {
  id: number;
  name: string;
}

export interface Skill {
  id: number;
  description: string;
  is_done: boolean;
  theme_id: number;
}
