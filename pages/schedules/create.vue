<template>
  <div class="w-100">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
       <b-form-group
        class="text-white"
        id="input-group-3"
        label="Diponibilty:"
        label-for="input-3"
      >
        <b-form-select
          id="input-3"
          v-model="form.disponibility_id"
          :options="dispos"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        class="text-white"
        id="input-group-3"
        label="Patient:"
        label-for="input-3"
      >
        <b-form-select
          id="input-3"
          v-model="form.user_id"
          :options="patients"
          required
        ></b-form-select>
      </b-form-group>
           <b-form-group
        id="input-group-2"
        label="Observation:"
        label-for="input-2"
        class="text-white"
      >
        <b-form-input
          type="text"
          v-model="form.date"
          class="mb-2"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="warning">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      default: {},
      form: {
        observation: null,
        disponibility_id: null,
        user_id: null,
      },
      dispos: [{ text: "Select One", value: null }],
      patients: [{ text: "Select One", value: null }],
      show: true,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let self = this;

      let token = null;
     
      self.showLoader = true;

      if (process.browser) {
        token = localStorage.getItem("auth._token.laravelJWT");
      }  

      self.$axios
        .get(`${process.env.baseUrl}/api/disponibility/options`, {
          Authorization: token,
        })
        .then((response) => {
          self.showLoader = false;
          self.dispos = [...this.dispos, ...response.data];
        })
        .catch(function (error) {
          self.showLoader = false;
          console.log(error);
        });

         self.$axios
        .get(`${process.env.baseUrl}/api/patients`, {
          Authorization: token,
        })
        .then((response) => {
          self.showLoader = false;
          self.patients = [...this.patients, ...response.data];
        })
        .catch(function (error) {
          self.showLoader = false;
          console.log(error);
        });
    },

    onSubmit(event) {
      event.preventDefault();
      let self = this;

      let token = null;
      let id = self.$route.params.id;

      self.showLoader = true;

      if (process.browser) {
        token = localStorage.getItem("auth._token.laravelJWT");
      }

      self.$axios
        .post(`${process.env.baseUrl}/api/schedules`,self.form, {
          Authorization: token,
        })
        .then((response) => {
          this.$router.push(`/schedules`);
          self.showLoader = false;
        })
        .catch(function (error) {
          self.showLoader = false;
          console.log(error);
        });
    },
    onReset(event) {
      event.preventDefault();
      this.$router.push(`/schedules`);
    },
  },
};
</script>