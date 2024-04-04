export interface LocalItem {
  type: string;
  key: string;
  text: string;
}

export interface LocalQuest {
  text: string;
  drop: { gp: number; exp: number; items?: LocalItem[] };
}

export type LocalQuestsData = Record<string, LocalQuest>;
