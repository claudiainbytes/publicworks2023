<template>
    <nav v-if="totalItems > 0" aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous" @click="clickDirectionButton('Previous')">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
            <li  v-for="(page, index) in arrPagesToShow" :key="index" class="page-item">
                <a v-if="page === paginator.currentPage" class="page-link current-page" href="#" @click="clickOnPage(page)">{{ page }}</a>
                <a v-else class="page-link" href="#" @click="clickOnPage(page)">{{ page }}</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next" @click="clickDirectionButton('Next')">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<style>
.pagination li a.page-link:focus {
    z-index: 0;
    outline: 0;
    box-shadow: unset;
}
.pagination li a.page-link.current-page {
  background-color: #007bff;
  color: #fff;
}
</style>
<script setup>

import { ref, computed } from 'vue'

const { paginator } = defineProps({ paginator: Object })

let { itemsPerPage, totalItems, numMaxPagesToShow, currentPage } = paginator

const arrPages = []

if ( currentPage <= 0 ) {
    currentPage = 1
    paginator.currentPage = currentPage
}

if ( itemsPerPage <= 0 ) {
    itemsPerPage = 3
    paginator.itemsPerPage = itemsPerPage
}

if ( numMaxPagesToShow <= 0 ) {
    numMaxPagesToShow = 3
    paginator.numMaxPagesToShow = numMaxPagesToShow
}

const numPages = (itemsPerPage > 0 && totalItems > 0) ? (Math.ceil(totalItems / itemsPerPage)) : 0

for(let i = 0; i < numPages; i++) {
    arrPages.push(i + 1)
}

const initialRangePage = ref(0)
const finalRangePage = ref(numMaxPagesToShow)

const arrPagesToShow = computed(() => {
    return arrPages.slice(initialRangePage.value, finalRangePage.value)
})

const clickDirectionButton = (direction) => {
    if (direction === 'Next') { 
        if(paginator.currentPage < numPages ){
            if((paginator.initialRange + paginator.itemsPerPage) <= paginator.totalItems ) {
                paginator.initialRange = paginator.finalRange 
                paginator.finalRange = (paginator.initialRange + paginator.itemsPerPage) 
                initialRangePage.value++ 
                finalRangePage.value++
                paginator.currentPage = initialRangePage.value + 1
            }
        }
    } else if (direction === 'Previous') { 
        if((paginator.initialRange - paginator.itemsPerPage) >= 0 ) {
            paginator.initialRange = (paginator.initialRange - paginator.itemsPerPage)
            paginator.finalRange = (paginator.initialRange + paginator.itemsPerPage) 
            initialRangePage.value-- 
            finalRangePage.value--
            paginator.currentPage = initialRangePage.value + 1
        }   
    } 
}

const clickOnPage = (page) => {

    if(paginator.currentPage === page){
        if (page < paginator.numMaxPagesToShow){
            paginator.currentPage =  1
            paginator.initialRange = 0
            paginator.finalRange = paginator.initialRange + paginator.itemsPerPage 
        } else {
            paginator.currentPage = ( page - paginator.itemsPerPage ) + 1
            paginator.initialRange = ( page - paginator.itemsPerPage ) * paginator.itemsPerPage
            paginator.finalRange = paginator.initialRange + paginator.itemsPerPage 
        }
        if(paginator.currentPage >= 0){
            initialRangePage.value = paginator.currentPage - 1
            finalRangePage.value = initialRangePage.value + paginator.numMaxPagesToShow
        }
    } else {
        paginator.initialRange = ( page * paginator.itemsPerPage ) - paginator.itemsPerPage
        paginator.finalRange = page * paginator.itemsPerPage 
        paginator.currentPage = page
        if(paginator.currentPage <= numPages){
            initialRangePage.value = page - 1
            finalRangePage.value = (page - 1) + paginator.numMaxPagesToShow
        }
    }
}

</script>