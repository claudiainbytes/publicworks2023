var url_origin = window.location.origin;

function getDomain(url, subdomain) {
    subdomain = subdomain || false;
    url = url.replace(/(https?:\/\/)?(www.)?/i, '');
    if (!subdomain) {
        url = url.split('.');

        url = url.slice(url.length - 2).join('.');
    }
    if (url.indexOf('/') !== -1) {
        return url.split('/')[0];
    }
    return url;
}

const BASE_URL_DIR_IMAGES = "https://bogota.gov.co/bog/json-obras/avances-obras/movilidad";
const BASE_URL_PAGE = '/asi-vamos/seguimiento-a-las-obras'; 
const BASE_URL_DEFAULT_IMAGES = "https://bogota.gov.co/bog/json-obras/avances-obras/movilidad/default-nuevos-salud.jpg"; 
var BASE_URL_JSON =  '/modules/custom/filtro_consolidado_obras/json-obras/json-data.json'; 
var BASE_URL_FILTROS = '/modules/custom/filtro_consolidado_obras/json-obras/filtros-json-data.json'; 

if (getDomain(url_origin, true) == "bogota.gov.co" )  {
        BASE_URL_JSON =  'https://bogota.gov.co/bog/json-obras/obras-data.json'; 
        BASE_URL_FILTROS = 'https://bogota.gov.co/bog/json-obras/filtros-json-data.json'; 
} 

var avancesComponentApp = new Vue({
    el: '#avances-component-app',
    data: {
        posts: [],
        baseUrl:  BASE_URL_PAGE,
        baseUrlJSON: BASE_URL_JSON,
        baseUrlDirImages: BASE_URL_DIR_IMAGES,
        defaultImage: BASE_URL_DEFAULT_IMAGES,
        baseUrlFiltros:  BASE_URL_FILTROS,
        eje: "", //MOVILIDAD
        page: 1,
        perPage: 6,
        pages: [],
        numPages: 1,
        searchByEje: "",
        searchByLocalidad: "",
        searchByTipo: "",
        searchByProyecto: "",
        loading: true,
        errored: false,
        ejestematicos: [],
        tiposconstrucion: []
    },
    components: {
        paginate: VuejsPaginate
    },
    mixins: [Vue2Filters.mixin],
    methods: {
        clickOnPage: function(pageNum) {
            this.page = pageNum
        },
        getPosts () {
            axios.get(this.baseUrlJSON, { headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
              withCredentials: true,
              credentials: 'same-origin'})
             .then(response => {
                if(this.searchByEje == "") {
                    this.posts = response.data;
                } else {
                    this.posts = response.data.filter(item => (item.categoria === this.searchByEje));
                }
            })
            .catch(error => {
              console.log(error)
              this.errored = true
            })
            .finally(() => this.loading = false)
        },
        getEjesTematicos() {
            axios.get(this.baseUrlFiltros, { headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
              withCredentials: true,
              credentials: 'same-origin'})
            .then(response => {
                this.ejestematicos = response.data.filtros.ejes_tematicos;
            })
            .catch(error => {
                console.log(error)
            })
        },
        getTiposConstruccion () {
            axios.get(this.baseUrlFiltros)
            .then(response => {
                this.tiposconstrucion = response.data.filtros.tipos_construcion;
            })
            .catch(error => {
              console.log(error)
              this.errored = true
            })
        },
        getEje(event) {
            event.preventDefault();
            this.eje = event.target.value;
        },
        setDirectoryImages() {
            for(let post of this.posts){
                for(let eje of this.ejestematicos) {
                    if (post.hasOwnProperty('categoria')) {
                        if(post.categoria == eje.valor) {
                            post["baseUrlDirImages"] = eje.base_url_imagenes;
                        }
                    }
                }       
            }
        }, 
        setPages (posts) {
            let numberOfPages = Math.ceil(posts.length / this.perPage);
            this.numPages = numberOfPages;
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        getNumPages () {
            return this.numPages
        },
        paginate (posts) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return  posts.slice(from, to);
        },
    },
    computed: {
      displayedPosts () {
          let displayedPosts = this.posts.filter((post) => {
            if((this.searchByEje !== "") && (this.searchByLocalidad == "") && (this.searchByTipo == "") && (this.searchByProyecto == "")){
                if (post.hasOwnProperty('categoria')) {BASE_URL_DEFAULT_IMAGES
                    return post.categoria.toLowerCase().includes(this.searchByEje.toLowerCase());
                }
            }
            if((this.searchByEje == "") && (this.searchByLocalidad !== "") && (this.searchByTipo == "") && (this.searchByProyecto == "")){
                if (post.hasOwnProperty('localidad')) {
                    return post.localidad.toLowerCase().includes(this.searchByLocalidad.toLowerCase());
                }
            }
            if((this.searchByEje == "") && (this.searchByLocalidad == "") && (this.searchByTipo !== "") && (this.searchByProyecto == "")){
                if (post.hasOwnProperty('tipo_de_proyecto')) {
                    return post.tipo_de_proyecto.toLowerCase().includes(this.searchByTipo.toLowerCase());
                }
            }
            if((this.searchByEje == "") && (this.searchByLocalidad == "") && (this.searchByTipo == "") && (this.searchByProyecto !== "")){
                if (post.hasOwnProperty('nombre_proyecto')) {
                    return post.nombre_proyecto.toLowerCase().includes(this.searchByProyecto.toLowerCase());
                }  
            }
            if((this.searchByEje !== "") && (this.searchByLocalidad !== "") && (this.searchByTipo == "") && (this.searchByProyecto == "")){
                if (post.hasOwnProperty('localidad') && post.hasOwnProperty('categoria')) {
                    return (post.localidad.toLowerCase().includes(this.searchByLocalidad.toLowerCase()) && post.categoria.toLowerCase().includes(this.searchByEje.toLowerCase()));
                }
            }
            if((this.searchByEje == "") && (this.searchByLocalidad !== "") && (this.searchByTipo !== "") && (this.searchByProyecto == "")){
                if (post.hasOwnProperty('localidad') && post.hasOwnProperty('tipo_de_proyecto')) {
                    return (post.tipo_de_proyecto.toLowerCase().includes(this.searchByTipo.toLowerCase()) && post.localidad.toLowerCase().includes(this.searchByLocalidad.toLowerCase()));
                }
            }
            if((this.searchByEje == "") && (this.searchByLocalidad == "") && (this.searchByTipo !== "") && (this.searchByProyecto !== "")){
                if (post.hasOwnProperty('nombre_proyecto') && post.hasOwnProperty('tipo_de_proyecto')) {
                    return (post.tipo_de_proyecto.toLowerCase().includes(this.searchByTipo.toLowerCase()) && post.nombre_proyecto.toLowerCase().includes(this.searchByProyecto.toLowerCase()));
                } 
            }
            if((this.searchByEje !== "") && (this.searchByLocalidad == "") && (this.searchByTipo == "") && (this.searchByProyecto !== "")){
                if (post.hasOwnProperty('nombre_proyecto') && post.hasOwnProperty('categoria')) {
                    return (post.nombre_proyecto.toLowerCase().includes(this.searchByProyecto.toLowerCase()) && post.categoria.toLowerCase().includes(this.searchByEje.toLowerCase()));
                }
            }
            if((this.searchByEje == "") && (this.searchByLocalidad !== "") && (this.searchByTipo == "") && (this.searchByProyecto !== "")){
                if (post.hasOwnProperty('nombre_proyecto') && post.hasOwnProperty('localidad')) {
                    return (post.localidad.toLowerCase().includes(this.searchByLocalidad.toLowerCase()) && post.nombre_proyecto.toLowerCase().includes(this.searchByProyecto.toLowerCase()));
                }
            }
            if((this.searchByEje !== "") && (this.searchByLocalidad == "") && (this.searchByTipo !== "") && (this.searchByProyecto == "")){
                if (post.hasOwnProperty('tipo_de_proyecto') && post.hasOwnProperty('categoria')) {
                    return (post.tipo_de_proyecto.toLowerCase().includes(this.searchByTipo.toLowerCase()) && post.categoria.toLowerCase().includes(this.searchByEje.toLowerCase()));
                }
            }
            if((this.searchByEje !== "") && (this.searchByLocalidad !== "") && (this.searchByTipo !== "") && (this.searchByProyecto == "")){
                if (post.hasOwnProperty('localidad') && post.hasOwnProperty('tipo_de_proyecto') && post.hasOwnProperty('categoria')) {
                    return (post.localidad.toLowerCase().includes(this.searchByLocalidad.toLowerCase()) && post.tipo_de_proyecto.toLowerCase().includes(this.searchByTipo.toLowerCase()) && post.categoria.toLowerCase().includes(this.searchByEje.toLowerCase()));
                }
            }
            if((this.searchByEje == "") && (this.searchByLocalidad !== "") && (this.searchByTipo !== "") && (this.searchByProyecto !== "")){
                if (post.hasOwnProperty('nombre_proyecto') && post.hasOwnProperty('localidad') && post.hasOwnProperty('tipo_de_proyecto')) {
                    return (post.localidad.toLowerCase().includes(this.searchByLocalidad.toLowerCase()) && post.tipo_de_proyecto.toLowerCase().includes(this.searchByTipo.toLowerCase()) && post.nombre_proyecto.toLowerCase().includes(this.searchByProyecto.toLowerCase()));
                }
            }
            if((this.searchByEje !== "") && (this.searchByLocalidad == "") && (this.searchByTipo !== "") && (this.searchByProyecto !== "")){
                if (post.hasOwnProperty('nombre_proyecto') && post.hasOwnProperty('tipo_de_proyecto') && post.hasOwnProperty('categoria')) {
                    return (post.tipo_de_proyecto.toLowerCase().includes(this.searchByTipo.toLowerCase()) && post.nombre_proyecto.toLowerCase().includes(this.searchByProyecto.toLowerCase()) && post.categoria.toLowerCase().includes(this.searchByEje.toLowerCase()));
                }
            }
            if((this.searchByEje !== "") && (this.searchByLocalidad !== "") && (this.searchByTipo == "") && (this.searchByProyecto !== "")){
                if (post.hasOwnProperty('nombre_proyecto') && post.hasOwnProperty('localidad') && post.hasOwnProperty('categoria')) {
                    return (post.localidad.toLowerCase().includes(this.searchByLocalidad.toLowerCase()) && post.nombre_proyecto.toLowerCase().includes(this.searchByProyecto.toLowerCase()) && post.categoria.toLowerCase().includes(this.searchByEje.toLowerCase()));
                }
            }
            if((this.searchByEje !== "") && (this.searchByLocalidad !== "") && (this.searchByTipo !== "") && (this.searchByProyecto !== "")){
                if (post.hasOwnProperty('nombre_proyecto') && post.hasOwnProperty('localidad') && post.hasOwnProperty('tipo_de_proyecto') && post.hasOwnProperty('categoria')) {
                    return (post.localidad.toLowerCase().includes(this.searchByLocalidad.toLowerCase()) && post.tipo_de_proyecto.toLowerCase().includes(this.searchByTipo.toLowerCase()) && post.nombre_proyecto.toLowerCase().includes(this.searchByProyecto.toLowerCase()) && post.categoria.toLowerCase().includes(this.searchByEje.toLowerCase()));
                }
            }
            if((this.searchByEje == "") && (this.searchByLocalidad == "") && (this.searchByTipo == "") && (this.searchByProyecto == "")){
                return this.posts;
            }
          });
          this.setDirectoryImages();
          this.setPages(displayedPosts);
          return this.paginate(displayedPosts); 
      },
      displayedTiposconstrucion() {
        if(this.eje == "") {
            return this.tiposconstrucion;
        } else {
            return this.tiposconstrucion.filter(item => (item.eje === this.eje));
        }
      }
    },
    watch: {
        posts () {
            this.setPages(this.posts);
            this.getNumPages();
        }
    },
    mounted () {
        var tipoProyecto = "";
        var self = this;
        self.getEjesTematicos();
        self.getPosts();
        self.getTiposConstruccion();
      }
  });
Vue.component('avancemodal', {
    data: function () {
        return {
            baseUrlDirImages: BASE_URL_DIR_IMAGES,
            defaultImage: BASE_URL_DEFAULT_IMAGES
        }
    },
    components: {
        VueSlickCarousel : window['vue-slick-carousel'] 
    },
    props: ['item'],
    template: `<div>
                    <div class="modal fade obra-modal" v-bind:id="'exampleModal' + item.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title font-rajdhani_bold txt-educacion pl-3" id="exampleModalLabel">{{ item.nombre_proyecto }}</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                                <div class="modal-body">
                                    <div class="container-fluid">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="obra-carousel" v-if="item.imagenes.length !== 0"> 
                                                    <vue-slick-carousel :arrows="true" :dots="true">
                                                        <div v-for="(itemImg, index) in item.imagenes" :key="index">
                                                            <div>
                                                                <div class="image">
                                                                <img class="img-fluid" v-bind:src="item.baseUrlDirImages + '/' + item.id + '/' + itemImg" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </vue-slick-carousel>
                                                </div>
                                                <img class="img-fluid d-block mx-auto w-100 default-image" v-else v-bind:src="defaultImage" v-bind:alt="item.nombre_proyecto">
                                            </div>
                                        </div>
                                        <div class="w-100"></div>
                                        <div class="row">
                                            <div class="col-12">
                                                    <div class="d-flex justify-content-between align-items-end my-3">
                                                        <div class="obra-detalle-info">
                                                            <p v-show="item.localidad" class="text-left font-style_normal font-rajdhani_bold">{{ item.localidad }}</p>
                                                            <p v-show="item.entidad" class="text-left font-style_normal font-rajdhani_medium txt-gris">{{ item.entidad }}</p>
                                                            <p v-show="item.tipo_de_proyecto" class="text-left font-style_normal font-rajdhani_medium txt-gris">{{ item.tipo_de_proyecto }}</p>
                                                            <p v-show="item.estado_actual" class="text-left font-style_italic font-rajdhani_medium txt-gris">{{ item.estado_actual }}</p>
                                                        </div>
                                                        <div>
                                                        <button type="button" class="btn btn-secondary bg-movilidad font-rajdhani_medium border-educacion" data-dismiss="modal">Cerrar</button>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
});
  
  