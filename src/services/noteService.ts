import axios from "axios";
import type { Note, NewNote } from "../types/note.ts";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface GetNote {
  notes: Note[]; // массив заметок
  totalPages: number; // всего страниц (для пагинации)
  total: number;
}

export async function fetchNotes(
  search: string,
  page: number = 1,
  perPage: number = 12
): Promise<GetNote> {
  const response = await axios.get<GetNote>(
    "https://notehub-public.goit.study/api/notes",
    {
      params:
        search.trim() !== "" ? { search, page, perPage } : { page, perPage },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    newNote,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  return response.data;
}

export const deleteNote = async (id: number): Promise<Note> => {
  const res = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
  return res.data;
};


