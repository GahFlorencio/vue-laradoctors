<template>
  <b-modal
    @ok="deleteResource()"    
    @hidden="resetModal"
    v-model="show"
    >You want delete ?</b-modal
  >
</template>

<script>
export default {
  props: ["handleModal", "modalShow", "resource", "resource_id"],
  data(){return{
      show:false,
      id:null,

  }},
  watch: {
    modalShow(value) {
        this.show =  value
    },

    resource_id(value) {
        this.id =  this.resource_id
    },

  },
  methods: {
    deleteResource() {
      let self = this;
      let token = null;

      if (process.browser) {
        token = localStorage.getItem("auth._token.laravelJWT");
      }

      self.$axios
        .delete(
          `http://api.laradoctors.test/api/${self.resource}/${self.resource_id}`,
          self.form,
          {
            Authorization: token,
          }
        )
        .then((response) => {
          this.$router.push(`/${this.resource}`);
          self.showLoader = false;
        })
        .catch(function (error) {
          self.showLoader = false;
          console.log(error);
        });
    },
    resetModal() {
      this.handleModal();
    },
  },
};
</script>