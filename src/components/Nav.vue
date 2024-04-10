<template>
      <nav>
      </nav>
</template>
<script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useSystemStore } from './../store/system_store'
  import { useLangSwitcherStore } from './../store/langswitcher_store'
  import LangSwitcher from './minicomponents/LangSwitcher.vue' 
  import ThemeSwitcher from './minicomponents/ThemeSwitcher.vue' 

  const langSwitcherStore = useLangSwitcherStore()
  const currentLang = reactive(langSwitcherStore.getCurrentLang)

  const systemStore = useSystemStore()
  const menuData = systemStore.getCurrentSystemData.menu.map( item => item ) 

  const router = useRouter()

</script>