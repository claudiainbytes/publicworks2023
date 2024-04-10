<template>
    <div class="container py-4 px-3 mx-auto">
      <h1>Public Works</h1>
    </div>
</template>
<script setup>
  import { reactive, computed } from 'vue'
  import { useDataStore } from '../store/data_store'
  import { useLangSwitcherStore } from '../store/langswitcher_store'

  const langSwitcherStore = useLangSwitcherStore()
  const currentLang = reactive(langSwitcherStore.getCurrentLang)

  const dataStore = useDataStore()
  const introData = dataStore.getCurrentData.sections.find(s => s.name === 'Intro')

  const education_list = computed(() => introData.education.list.sort( (a, b) => a.order - b.order ))
  const experience_list = computed(() => introData.experience.list.sort( (a, b) => a.order - b.order ))

</script>