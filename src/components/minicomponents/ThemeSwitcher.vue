<template>
    <a class="social-media-icon-link" @click="switchTheme"><i :class="[ currentTheme.icon ]"></i></a>
</template>
<script setup>
  import { ref, reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useThemeSwitcherStore } from './../../store/themeswitcher_store'
  
  const themeSwitcherStore = useThemeSwitcherStore()
  const currentTheme = reactive(themeSwitcherStore.getCurrentTheme)

  const switchTheme = () => {
    if(currentTheme.mode === "dark"){
        themeSwitcherStore.setCurrentTheme({ mode:'light', theme: 'lofi', icon: 'fa-solid fa-moon', bgcolor: '#ffffff', color:'#000000'})
    } else {
        themeSwitcherStore.setCurrentTheme({ mode:'dark', theme: 'synthwave', icon: 'fa-regular fa-sun', bgcolor: '#1a103d', color:'#e779c1'})
    }
    document.querySelector("html").setAttribute("data-theme", currentTheme.theme)
  }
</script>