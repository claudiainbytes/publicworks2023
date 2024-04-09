// store/system_store.js
import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

// langwitcher as store name to access in each component
export const useSystemStore = defineStore('systemStore', () => {

    // Global var
    const current_system_data = reactive({});

    // Getters and Setters
    const getCurrentSystemData = computed(() => current_system_data );
    
    const setCurrentSystemData = (new_system_data) => { 
       Object.assign(current_system_data, new_system_data)
    }

    // State vars, getters, setters
    return {
      current_system_data,
      getCurrentSystemData,
      setCurrentSystemData
    }

  }, 
  {
	// LocalStorage by default
    persist: false,
  },
);