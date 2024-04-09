// store/data_store.js
import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

// langwitcher as store name to access in each component
export const useDataStore = defineStore('dataStore', () => {

    // Global var
    const current_data = reactive({});

    // Getters and Setters
    const getCurrentData = computed(() => current_data );
    
    const setCurrentData = (new_data) => { 
       Object.assign(current_data, new_data)
    }

    // State vars, getters, setters
    return {
      current_data,
      getCurrentData,
      setCurrentData
    }

  }, 
  {
	// LocalStorage by default
    persist: false,
  },
);