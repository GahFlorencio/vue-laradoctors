<template>
  <div>
    <DeleteModal
      :handleModal="handleModal"
      :modalShow="deleteModal"
      :resource="model"
      :resource_id="modalId"
    />
    <client-only>
      <vue-bootstrap4-table
        :rows="rows"
        :columns="cols"
        :config="config"
        @on-change-query="onChangeQuery"
        :show-loader="showLoader"
        :total-rows="total_rows"
        class="p-0 w-100"
      >
        <template
          v-if="model === 'disponibilities'"
          slot="schedule"
          slot-scope="rows"
        >
          <a
            @click="handleOpenRelation('schedules', rows.row.schedule.id)"
            v-if="rows.row.schedule !== null"
            href="javascript:void(0);"
          >
            {{ rows.row.schedule.id }}
          </a>
          <p v-else class="text-success">None</p>
        </template>
        <template
          v-if="model === 'schedules'"
          slot="disponibility"
          slot-scope="rows"
        >
          <a
            @click="handleOpenRelation('schedules', rows.row.disponibility.id)"
            v-if="rows.row.disponibility !== null"
            href="javascript:void(0);"
          >
            {{ rows.row.disponibility.id }}
          </a>
        </template>
        <template
          v-if="model === 'schedules'"
          slot="observation"
          slot-scope="rows"
        >
          {{ rows.row.observation !== null ? "Yes" : "No" }}
        </template>
        <template slot="actions" slot-scope="rows">
          <div class="d-flex flex-row justify-content-around">
            <div class="h-1 mb-0 text-primary" @click="handleOpen(rows.row.id)">
              <b-icon icon="eye"></b-icon>
            </div>
            <div class="h-1 mb-0 text-danger" @click="openModal(rows.row.id)">
              <b-icon icon="trash"></b-icon>
            </div>
          </div>
        </template>
      </vue-bootstrap4-table>
    </client-only>
  </div>
</template>
 
<script>
import VueBootstrap4Table from "vue-bootstrap4-table";
import { BIcon, BIconPencilSquare, BIconTrash, BIconEye } from "bootstrap-vue";

export default {
  name: "Table",
  props: ["cols", "model", "title"],
  components: {
    VueBootstrap4Table,
    BIconPencilSquare,
    BIconTrash,
    BIcon,
    BIconEye,
  },
  data: function () {
    return {
      modalId: null,
      deleteModal: false,
      rows: [],
      queryParams: {
        sort: [],
        filters: [],
        global_search: "",
        per_page: 15,
        page: 1,
      },
      total_rows: 0,
      showLoader: true,

      config: {
        global_search: {
          placeholder: "Buscar",
          visibility: true,
          case_sensitive: false,
        },
        per_page_options: [5, 10, 20, 30],
        show_refresh_button: true,
        show_reset_button: false,
        server_mode: false,
        checkbox_rows: false,
        rows_selectable: false,
        selected_rows_info: true,

        card_title: this.title,
      },
    };
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    onChangeQuery(queryParams) {
      this.queryParams = queryParams;
      this.showLoader = true;
      this.fetchData();
    },
    fetchData() {
      let self = this;

      let token = null;

      self.showLoader = true;

      if (process.browser) {
        token = localStorage.getItem("auth._token.laravelJWT");
      }

      self.$axios
        .get(`http://api.laradoctors.test/api/${self.model}`, {
          Authorization: token,
          params: {
            queryParams: this.queryParams,
            page: this.queryParams.page,
          },
        })
        .then((response) => {
          self.rows = response.data.data;
          self.total_rows = response.data.total;
          self.showLoader = false;
        })
        .catch(function (error) {
          self.showLoader = false;
          console.log(error);
        });
    },
    handleOpen(id) {
      this.$router.push(`/${this.model}/${id}`);
    },
    handleOpenRelation(relation, id) {
      this.$router.push(`/${relation}/${id}`);
    },
    handleModal(){
      this.fetchData()
      this.deleteModal = false
    },
    openModal(id){
      
      this.modalId = id
      this.deleteModal = true
    }
  },
};
</script>