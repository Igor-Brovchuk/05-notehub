import axios from 'axios'
import { Note, NoteTag } from '../types/note'

const API_URL = 'https://notehub-public.goit.study/api'

const token = import.meta.env.VITE_NOTEHUB_TOKEN
if (!token) {
  throw new Error('Missing VITE_TMDB_API_TOKEN')
}
