<template>
  <div class="row">
    <div class="col-12 mt-4 mb-2 mt-lg-5 mb-lg-3">
      <h1>Public Works</h1>
      <p>Bogota's infraestructure projects during the government of major Claudia Lopez from 2020 to 2023.</p>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <div class="pw-nav">
        <Paginator :paginator="setPaginator" />
      </div>
    </div>
  </div>
  <div class="row mb-4 mb-lg-4">
    <div class="col-12 col-lg-3">
      <div class="form-group">
        <label for="exampleFormControlSelect1">Area</label>
        <select class="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </div>
    <div class="col-12 col-lg-3">
      <div class="form-group">
        <label for="exampleFormControlSelect1">Borough</label>
        <select class="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </div>
    <div class="col-12 col-lg-3">
      <div class="form-group">
        <label for="exampleFormControlSelect1">Public Work</label>
        <select class="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
    </div>
    <div class="col-12 col-lg-3">
      <div class="form-group">
        <label for="projectName">Project name</label>
        <input type="text" class="form-control" id="projectName" placeholder="Project name...">
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-6 col-xl-4" v-for="item in publicWorksData" :key="item.id">
      <a class="pw-card">
        <div class="pw-card-top">
          <div class="pw-card-top_left">
            <div class="pw-card-top_left-circle">
              <img v-if="item.imagenes.length !== 0"
                v-bind:src="baseUrlDirImages + '/' + item.id + '/' + item.imagenes[0]"
                v-bind:alt="item.nombre_proyecto">
              <img class="img-fluid" v-else v-bind:src="defaultImage" v-bind:alt="item.nombre_proyecto">
            </div>
          </div>
          <div class="pw-card-top_right">
            <h3 v-show="item.nombre_proyecto">{{ item.nombre_proyecto }} </h3>
          </div>
        </div>
        <div class="pw-card-middle">
          <h3 v-if="item.localidad">{{ item.localidad }}</h3>
          <h3 v-else>Desconocida</h3>
        </div>
        <div class="pw-card-bottom">
          <div class="description">
            <p v-show="item.entidad"><strong>{{ item.entidad }}</strong></p>
            <p v-show="item.tipo_de_proyecto"><strong>Tipo de proyecto: </strong>{{ item.tipo_de_proyecto }}</p>
            <p v-show="item.estado_actual"><strong>Estado actual: </strong>{{ item.estado_actual }}</p>
          </div>
          <div class="details">
            <p v-if="item.inversion_pdd_millones !== '-'"><strong>Inversión PDD: </strong>${{
              item.inversion_pdd_millones }}</p>
            <p v-if="item.total_inversion_millones !== '-'"><strong>Total Inversión: </strong>${{
              item.total_inversion_millones }}</p>
            <p v-show="item.fecha_inicio_obra"><strong>Fecha Inicio Obra: </strong>{{ item.fecha_inicio_obra }}</p>
            <p v-show="item.fecha_terminacion_obra"><strong>Fecha Terminación Obra: </strong>{{
              item.fecha_terminacion_obra }}</p>
            <p v-show="item.total_empleo"><strong>Empleos: </strong>{{ item.total_empleo }}</p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
  import Paginator from '../components/minicomponents/Paginator.vue'
  import { useDataStore } from '../store/data_store'
  
  const BASE_URL_DIR_IMAGES = "./img/public-works"
  const BASE_URL_DEFAULT_IMAGES = "./img/default.jpg"

  export default {
    name: 'PublicWorks',
    components: {
      Paginator
    },
    data() {
      return {
        baseUrlDirImages: BASE_URL_DIR_IMAGES,
        defaultImage: BASE_URL_DEFAULT_IMAGES,
        paginator: {
          itemsPerPage: 3,
          totalItems: 0,
          initialRange: 0,
          finalRange: 0,
          currentPage: 1,
          numMaxPagesToShow: 6
        }
      }
    },
    computed: {
      publicWorksData() {
        return this.setRangeToShow()
      },
      setPaginator() {
        this.paginator.totalItems = this.setTotalItems()
        this.paginator.finalRange = this.setFinalRange()
        console.log("Estado paginador:", this.paginator)
        return this.paginator
      }
    },
    methods: {
      getAllData() {
        const dataStore = useDataStore()
        return Object.values(dataStore.getCurrentData)
      },
      setTotalItems() {
        return this.getAllData().length
      },
      setFinalRange() {
        if (this.paginator.finalRange === 0  ) {
          return this.paginator.itemsPerPage 
        }
        return this.paginator.finalRange 
      },
      setRangeToShow() {
        return this.getAllData().slice(this.paginator.initialRange, this.paginator.finalRange)
      }
    },
    watch: {

    }  
  }
</script>