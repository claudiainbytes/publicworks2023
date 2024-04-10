<template>
    <header>
    </header>
</template>
<script setup>
  import { reactive } from 'vue'
  import { useDataStore } from './../store/data_store'

  const dataStore = useDataStore()
  const currentData = reactive(dataStore.getCurrentData)
  const headerData = currentData.header
</script>