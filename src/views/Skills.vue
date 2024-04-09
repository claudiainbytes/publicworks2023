<template>
    <div class="w-full grid grid-cols-1 gap-8">
        <div class="prose max-w-none">
            <h2 class="mb-4 text-secondary">{{ skillsData.title[currentLang.lang] }}</h2>
            <p class="mb-4" v-html="skillsData.description[currentLang.lang]"></p>
        </div>
    </div>
</template>
<script setup>
  import { reactive } from 'vue'
  import { useDataStore } from '../store/data_store'
  import { useLangSwitcherStore } from '../store/langswitcher_store'

  const langSwitcherStore = useLangSwitcherStore()
  const currentLang = reactive(langSwitcherStore.getCurrentLang)

  const dataStore = useDataStore()
  const skillsData = dataStore.getCurrentData.sections.find(s => s.name === 'Skills')

</script>