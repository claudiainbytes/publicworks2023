// store/langswitcher_store.js
import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

// langwitcher as store name to access in each component
export const useLangSwitcherStore = defineStore('langSwitcher', () => {

    // Global var
    const current_lang = reactive({ language:'english', lang: 'en', flag: ''});

    // Getters and Setters
    const getCurrentLang = computed(() => current_lang );
    
    const setCurrentLang = (new_lang) => { 
      Object.assign(current_lang, new_lang)
    };

    // State vars, getters, setters
    return {
      current_lang,
      getCurrentLang,
      setCurrentLang
    }

  }, 
  {
	// LocalStorage by default
    persist: true,
  },
);