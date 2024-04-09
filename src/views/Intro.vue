<template>
    <div class="w-full grid grid-cols-1 gap-8">
        <div class="prose max-w-none">
            <h2 class="mb-4 text-secondary">{{ introData.title[currentLang.lang] }}</h2>
            <p class="mb-4">{{ introData.description[currentLang.lang] }}</p>
            <div class="divider"></div> 
        </div>
    </div>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div class="prose max-w-none">
            <h2 class="mb-4 text-secondary">{{ introData.education.title[currentLang.lang] }}</h2>
            <p class="mb-4" v-for="education in education_list" :key="education.id">
              <span><strong>{{ education.degree_major[currentLang.lang] }}</strong></span><br/>
              <span>{{ education.institute[currentLang.lang] }}</span><br/>
              <span>{{ education.years[currentLang.lang] }}</span><br/>
            </p>
        </div>
        <div class="prose max-w-none">
            <h2 class="mb-4 text-secondary">{{ introData.experience.title[currentLang.lang] }}</h2>
            <p class="mb-4" v-for="experience in experience_list" :key="experience.id">
              <span><strong>{{ experience.role }}</strong></span><br/>
              <span>{{ experience.company[currentLang.lang] }}</span><br/>
              <span>{{ experience.years[currentLang.lang] }}</span><br/>
            </p>
        </div>
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