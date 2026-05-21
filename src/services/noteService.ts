import axios from 'axios'
import type { Note, NoteTag } from '../types/note'

const token = import.meta.env.VITE_NOTEHUB_TOKEN
if (!token) {
  throw new Error('Missing VITE_NOTEHUB_TOKEN')
}

const notehubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

interface FetchNotesResponse {
  notes: Note[]
  totalPages: number
}

interface FetchNotesParams {
  page?: number
  perPage?: number
  query?: string
}

export interface CreateNoteParams {
  title: string
  content: string
  tag: NoteTag
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  query = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await notehubApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      search: query.trim() || undefined,
    },
  })
  return response.data
}

export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
  const response = await notehubApi.post<Note>('/notes', newNote)

  return response.data
}

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await notehubApi.delete<Note>(`/notes/${id}`)

  return response.data
}
