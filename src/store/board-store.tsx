import { Board } from '@interfaces/board-interface';
import create from 'zustand';

interface BoardStore {
  board: Board | null;
  setBoard: (task: Board) => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  board: null,
  setBoard: (board) => set(() => ({ board })),
}));
