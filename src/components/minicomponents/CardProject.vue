<template>
    <div class="card w-fit bg-base-100 shadow-xl image-full">
        <figure><img :src="cardImgSmall" alt="Image of project" /></figure>
        <div class="card-body">
            <h3 class="card-title"><span class="bg-neutral text-warning">{{ card.title }}</span></h3>
            <p><span class="bg-neutral text-warning">{{ card.short_desc }}</span></p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary" @click="showModalWindow(modalId)">{{  buttonsData[0].name[currentLang.lang] }}</button>
            </div>
        </div>
        <ModalWindow :modalId="modalId" :card="card" />
    </div>
</template>
<script setup>
import { computed, reactive } from 'vue'
import { useSystemStore } from '../../store/system_store'
import { useLangSwitcherStore } from '../../store/langswitcher_store'
import ModalWindow from './ModalWindow.vue' 

const langSwitcherStore = useLangSwitcherStore()
const currentLang = reactive(langSwitcherStore.getCurrentLang)

const systemStore = useSystemStore()
const buttonsData = systemStore.getCurrentSystemData.buttons.map( item => item ) 

const { card } = defineProps({ card: Object })

const modalId = computed(() => `modal_${card.id}` )

const cardImgSmall = `./img/portfolio/${card.img_small}`

const showModalWindow = (modalId) => document.getElementById(modalId).showModal()

</script>