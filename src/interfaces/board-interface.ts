export interface Board {
  columns: Column[];
}

export interface Column {
  id: number | string;
  title: string;
  cards: Card[];
}

export interface Card {
  id: number | string;
  title: string;
  description: string;
}
