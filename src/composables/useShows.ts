import { ref } from 'vue'
import type { TVShow } from '@/types'

const shows = ref<TVShow[]>([])
const allShows = ref<TVShow[]>([])
const loading = ref(false)

async function fetchAllShows(): Promise<void> {
  loading.value = true

  try {
    const response = await fetch('https://api.tvmaze.com/shows')

    const data: TVShow[] = await response.json()

    allShows.value = data
    shows.value = data
  } finally {
    loading.value = false
  }
}

function filterShows(query: string): void {
  const trimmed = query?.trim()

  if (!trimmed) {
    shows.value = allShows.value
    return
  }

  shows.value = allShows.value.filter(show =>
    show.name.toLowerCase().includes(trimmed.toLowerCase())
  )
}

export function useShows() {
  return {
    shows,
    loading,
    fetchAllShows,
    filterShows,
  }
}