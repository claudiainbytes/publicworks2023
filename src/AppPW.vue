<template>
    <div v-if="((Object.keys(currentData).length > 0) && (Object.keys(currentSystemData).length > 0))">
      <Nav></Nav>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
    <div class="container" v-else>
      <div class="row">
        <div class="col">
          <p>Data is not available</p>
        </div>
      </div>
    </div>
    <VuePreloader
      :background-color="currentTheme.bgcolor"
      :color="currentTheme.color"
      transition-type="fade-right"
      :loading-speed="25"
      :transition-speed="1400"
    ></VuePreloader>
  </template>
  <script setup>
    import { ref, reactive, onMounted } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useThemeSwitcherStore } from './store/themeswitcher_store'
    import { useLangSwitcherStore } from './store/langswitcher_store'
    import { useDataStore } from './store/data_store'
    import { useSystemStore } from './store/system_store'
    import systemService  from './services/systemService'
    import dataService  from './services/dataService'
  
    import { VuePreloader } from 'vue-preloader';
    import '../node_modules/vue-preloader/dist/style.css'
    
    import Nav from './components/Nav.vue' 
    import Header from './components/Header.vue' 
    import Main from './components/Main.vue' 
    import Footer from './components/Footer.vue' 
  
    const themeSwitcherStore = useThemeSwitcherStore()
    const getCurrentTheme = storeToRefs(themeSwitcherStore)
    const currentTheme = reactive(themeSwitcherStore.getCurrentTheme)
  
    const systemStore = useSystemStore()
    const getCurrentSystemData = storeToRefs(systemStore)
    const currentSystemData = reactive(systemStore.getCurrentSystemData)
  
    const dataStore = useDataStore()
    const getCurrentData = storeToRefs(dataStore)
    const currentData = reactive(dataStore.getCurrentData)
  
    onMounted(() => {
      systemService
        .getAllSystemData()
        .then(allSystemData => systemStore.setCurrentSystemData(allSystemData))
        .catch(error => console.log(error))
      dataService
        .getAllData()
        .then(allData => dataStore.setCurrentData(allData))
        .catch(error => console.log(error))
    })
   
    document.querySelector("html").setAttribute("data-theme", currentTheme.theme)
  
  </script>
  
  