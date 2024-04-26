<template v-if="">
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous" @click="clickButton('Previous')">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next" @click="clickButton('Next')">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script setup>

const { paginator } = defineProps({ paginator: Object })

const { itemsPerPage, totalItems, initialRange, finalRange } = paginator

const clickButton = (direction) => {
    if (direction === 'Next') { 
        paginator.initialRange = finalRange + 1 
        paginator.finalRange = (finalRange + itemsPerPage)
        console.log(`${JSON.stringify(paginator)}`)
    } else { 
        
    } 
}

//const arrayItems = Object.values(items).map(item => item)

//const numPages = (itemsPerPage > 0 && arrayItems.length > 0) ? (Math.ceil(arrayItems.length / itemsPerPage)) : 0

//const maxNumPageLinks = 5

////const numPageLinks = numPages / 3 

//console.log(`itemsPerPage ${itemsPerPage}, numPages ${numPages}, numPageLinks  ${numPageLinks}`)
console.log(`total items ${itemsPerPage}, ${initialRange}, ${finalRange}, ${totalItems}`)


</script>