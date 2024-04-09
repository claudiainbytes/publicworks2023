<template>
    <div class="w-full grid grid-cols-1 gap-8">
        <div class="prose max-w-none">
            <h2 class="mb-4 text-secondary">{{ projectsData.title[currentLang.lang] }}</h2>
            <p class="mb-4">{{ projectsData.description[currentLang.lang] }}</p>
        </div>
    </div>
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
        <CardProject v-for="card in projectsData.cards" :key="card.id" :card="card"/>
    </div>
</template>
<script setup>
  import { reactive } from 'vue'
  import { useDataStore } from '../store/data_store'
  import { useLangSwitcherStore } from '../store/langswitcher_store'
  import CardProject from '../components/minicomponents/CardProject.vue'

  const langSwitcherStore = useLangSwitcherStore()
  const currentLang = reactive(langSwitcherStore.getCurrentLang)

  const dataStore = useDataStore()
  const projectsData = dataStore.getCurrentData.sections.find(s => s.name === 'Projects')

</script>