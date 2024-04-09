<template>
    <dialog :id="modalId" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box prose max-w-none">
            <h3 class="font-bold text-lg">{{ card.title }}</h3>
            <figure class="not-prose"><img :src="cardImgLarge" alt="Image of project" /></figure>
            <p>{{ card.description }}</p>
            <ul class="not-prose">
                <li v-if="card.gitpage"><a class="btn btn-primary btn-sm mr-2 mb-2" :href="card.gitpage" target="_blank"><i class="fa-brands fa-github"></i>GitHub</a></li>
                <li v-if="card.video"><a class="btn btn-primary btn-sm mr-2 mb-2" :href="card.video" target="_blank"><i class="fa-brands fa-youtube"></i>YouTube</a></li>
                <li v-if="card.demourl"><a class="btn btn-primary btn-sm mr-2 mb-2" :href="card.demourl" target="_blank"><i class="fa-solid fa-paper-plane"></i>Demo</a></li>
            </ul>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn btn-primary">{{  buttonsData[1].name[currentLang.lang] }}</button>
                </form>
            </div>
        </div>
    </dialog>
</template>
<script setup>
import { reactive } from 'vue'
import { useSystemStore } from '../../store/system_store'
import { useLangSwitcherStore } from '../../store/langswitcher_store'

const langSwitcherStore = useLangSwitcherStore()
const currentLang = reactive(langSwitcherStore.getCurrentLang)

const systemStore = useSystemStore()
const buttonsData = systemStore.getCurrentSystemData.buttons.map( item => item ) 

const { modalId, card } = defineProps({ modalId: String, card: Object })
const cardImgLarge = `./img/portfolio/${card.img_large}`
</script>