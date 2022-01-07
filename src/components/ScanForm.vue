<template>
  <div class="shadow p-5 rounded bg-dark">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label text-white"
        >Email</label
      >
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
      <div id="emailHelp" class="form-text">
        No compartiremos esta información con nadie.
      </div>
    </div>
    <div class="mb-3">
      <label for="scan-url" class="form-label text-white"
        >Url de la WebApp</label
      >
      <input type="text" class="form-control" id="scan-url" v-model="url" />
    </div>
    <div class="mb-3 form-check">
      <input
        type="checkbox"
        class="form-check-input"
        id="exampleCheck1"
        v-model="newsletter"
      />
      <label class="form-check-label text-white" for="exampleCheck1"
        >Quiero recibir noticias</label
      >
    </div>
    <!--- BUTTONS --->
    <div v-if="loading == true">
      <loading-spinner></loading-spinner>
    </div>

    <div v-if="loading == false && results == false">
      <button @click="submit" class="btn btn-outline-secondary text-white">
        Escanear
      </button>
    </div>

    <div v-if="loading == false && results == true">
      <button @click="submit" class="btn btn-outline-secondary text-white">
        Escanear
      </button>

      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-link ms-3 text-white"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Ver resultados
      </button>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Reporte</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body container">
          <!-- GENERAL INFO -->
          <div class="d-flex flex-row mb-3">
            <strong class="me-5">Sitio:</strong>
            <a v-bind:href="url">{{ url }}</a>
          </div>
          <!-- SEC HEADERS -->
          <div class="d-flex flex-row mb-3">
            <strong class="me-3">Encabezados:</strong>
            <div class="px-1" v-for="(e, key) in sec_headers" :key="key">
              <!-- ✖ and ✓ characters ==> https://unicode-table.com/en/2716/ -->
              <span class="badge bg-danger">✖ {{ e }}</span>
            </div>
          </div>
          <!-- INFO HEADERS -->
          <div class="d-flex flex-row mb-3">
            <strong class="me-3">Filtrado de información:</strong>
            <div class="px-1" v-for="(e, key) in info_headers" :key="key">
              <!-- ✖ and ✓ characters ==> https://unicode-table.com/en/2716/ -->
              <span class="badge bg-danger">✖ {{ e }}</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
          <button type="button" class="btn btn-primary">Descargar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LoadingSpinner from "./widgets/spinner";
import * as ACTIONS from "@/store/actions";
import { mapActions } from "vuex";
export default {
  name: "ScanForm",
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      url: "https://www.hacknoid.com/",
      email: "",
      newsletter: false,
      loading: false,
      // RESPONSE
      sec_headers: [],
      info_headers: [],
      results: false,
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.sendUrl(this.createFilter()).then((res) => {
        this.sec_headers = res.data.sec_headers;
        this.info_headers = res.data.info_headers;
        this.loading = false;
        this.results = true;
      });
    },
    createFilter() {
      return {
        url: this.url,
        email: this.email,
        newsletter: this.newsletter,
      };
    },
    ...mapActions({
      sendUrl: ACTIONS.URL.SEND,
    }),
  },
};
</script>
