<template>
    <div>
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