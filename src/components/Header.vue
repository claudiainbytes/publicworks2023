<template>
    <header class="col-span-12 lg:col-span-4 p-4">
        <div class="w-full h-full flex flex-col justify-start">
          <div class="w-full text-center p-4 pb-0 mb-4">
            <div class="avatar">
              <div class="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img :src="headerData.picture" />
              </div>
            </div>
          </div>
          <div class="w-full text-center p-4 mb-0 prose max-w-none">
            <h1 class="my-0 text-primary">{{ headerData.name }}</h1>
            <h3 class="my-0 text-secondary">{{ headerData.title_1 }}</h3>
          </div>
          <div class="w-full text-center p-4 prose prose-a:text-lg max-w-none">
            <h4 class="my-0"><i class="fa-solid fa-location-dot text-lg mr-2 mb-2"></i>{{ headerData.location }}</h4>
            <a class="social-media-icon-link" v-for="sm in headerData.social_media" :key="sm.id" :href="sm.url" :target="sm.target" v-show="sm.visible">
              <i :class="sm.iconclass"></i>
            </a>
          </div>
        </div>  
    </header>
</template>
<script setup>
  import { reactive } from 'vue'
  import { useDataStore } from './../store/data_store'

  const dataStore = useDataStore()
  const currentData = reactive(dataStore.getCurrentData)
  const headerData = currentData.header
</script>