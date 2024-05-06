<template v-if="">
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous" @click="clickButton('Previous')">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
            <li  v-for="(page, index) in arrPagesToShow" :key="index" class="page-item">
                <a v-if="page === paginator.currentPage" class="page-link current-page" :data-index="index" href="#" @click="clickOnPage(page)">{{ page }}</a>
                <a v-else class="page-link" href="#" :data-index="index" @click="clickOnPage(page)">{{ page }}</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next" @click="clickButton('Next')">
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

const { itemsPerPage, totalItems, initialRange, finalRange, numMaxPagesToShow } = paginator

const numPages = (itemsPerPage > 0 && totalItems > 0) ? (Math.ceil(totalItems / itemsPerPage)) : 0

const arrPages = []

for(let i = 0; i < numPages; i++) {
    arrPages.push(i + 1)
}

const initialRangePage = ref(0)
const finalRangePage = ref(numMaxPagesToShow)

const arrPagesToShow = computed(() => {
    console.log("Initial Range Page: ", initialRangePage.value)
    console.log("Final Range Page: ", finalRangePage.value)
    console.log("Initial Range: ", initialRange)
    console.log("Final Range: ", finalRange)
    console.log("numPages: ", numPages)
    return arrPages.slice(initialRangePage.value, finalRangePage.value)
})
console.log("current page:", paginator.currentPage)
const clickButton = (direction) => {
    console.log("Before:", `${JSON.stringify(paginator)}`)
    console.log("current page:", paginator.currentPage)
    if (direction === 'Next') { 
        console.log("versus", paginator.currentPage, " vs ", numPages )
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
    
    console.log("After:", `${JSON.stringify(paginator)}`)
    console.log("current page:", paginator.currentPage)
}

const clickOnPage = (page) => {
    console.log("Page selected is", page)
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
        console.log("paginator current", paginator.currentPage)
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
    console.log("After:", `${JSON.stringify(paginator)}`)
}

</script>