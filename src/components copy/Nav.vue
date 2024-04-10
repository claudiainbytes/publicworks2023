<template>
      <nav class="col-span-12">
            <div class="navbar bg-base-100">
              <div class="navbar-start">
                <div class="dropdown">
                  <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                  </div>
                  <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><router-link :to="{ name: 'Intro'  }">{{ menuData[0].name[currentLang.lang] }}</router-link></li>
                    <li><router-link :to="{ name: 'Skills'  }">{{ menuData[1].name[currentLang.lang] }}</router-link></li>
                    <li><router-link :to="{ name: 'Projects'  }">{{ menuData[2].name[currentLang.lang] }}</router-link></li>
                    <li><a>{{ menuData[3].name[currentLang.lang] }}</a></li>
                  </ul>
                </div>
                <a class="btn btn-ghost text-sm lg:text-xl text-primary">@claudiainbytes</a>
              </div>
              <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
                    <li><router-link :to="{ name: 'Intro'  }">{{ menuData[0].name[currentLang.lang] }}</router-link></li>
                    <li><router-link :to="{ name: 'Skills'  }">{{ menuData[1].name[currentLang.lang] }}</router-link></li>
                    <li><router-link :to="{ name: 'Projects'  }">{{ menuData[2].name[currentLang.lang] }}</router-link></li>
                    <li><a :href="menuData[3].href" :target="menuData[3].href">{{ menuData[3].name[currentLang.lang] }}</a></li>
                </ul>
              </div>
              <div class="navbar-end">
                <LangSwitcher></LangSwitcher><ThemeSwitcher></ThemeSwitcher>
              </div>
            </div>
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