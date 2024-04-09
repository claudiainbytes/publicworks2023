<template>
    <a class="social-media-icon-link" @click="switchLang">{{ currentLang.lang.toUpperCase() }}</a>
</template>
<script setup>
  import { ref, reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useLangSwitcherStore } from './../../store/langswitcher_store'
  
  const langSwitcherStore = useLangSwitcherStore()
  const getCurrentLang = storeToRefs(langSwitcherStore)
  const currentLang = reactive(langSwitcherStore.getCurrentLang)

  const switchLang = () => {
    if(currentLang.lang === "en"){
        langSwitcherStore.setCurrentLang({ language:'spanish', lang: 'es', flag: ''})
    } else {
        langSwitcherStore.setCurrentLang({ language:'english', lang: 'en', flag: ''})
    }
  }
</script>