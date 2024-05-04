export interface TranslatedItem {
  type: string;
  key: string;
  text: string;
}

export interface TranslatedQuest {
  text: string;
  drop: { gp: number; exp: number; items?: TranslatedItem[] };
}

export type TranslatedQuestsData = Record<string, TranslatedQuest>;
