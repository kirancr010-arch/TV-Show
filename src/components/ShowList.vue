
<template>
  <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 py-8">
    <p v-if="loading" class="text-gray-400 text-center py-12">Loading shows...</p>
    <p v-else-if="!shows.length" class="text-gray-400 text-center py-12">No shows found.</p>
    <ul v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <ShowCard v-for="show in shows" :key="show.id" :show="show" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ShowCard from '@/components/ShowCard.vue'
import { useShows } from '@/composables/useShows'

const { shows, loading, fetchAllShows } = useShows()

onMounted(fetchAllShows)
</script>



app.specs.ts for both

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from '../App.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: '<div />' } }],
})

describe('App', () => {
  it('mounts without errors', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: { AppHeader: true, RouterView: true },
      },
    })
    await router.isReady()
    expect(wrapper.exists()).toBe(true)
  })

  it('renders main content area', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
        stubs: { AppHeader: true, RouterView: true },
      },
    })
    expect(wrapper.find('#main-content').exists()).toBe(true)
  })
})
