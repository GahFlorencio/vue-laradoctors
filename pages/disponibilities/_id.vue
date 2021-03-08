<template>
  <div class="w-100">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-2"
        label="Date:"
        label-for="input-2"
        class="text-white"
      >
        <b-form-datepicker
          locale="pt-br"
          id="example-datepicker"
          v-model="form.date"
          class="mb-2"
        ></b-form-datepicker>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Time:"
        label-for="input-2"
        class="text-white"
      >
        <b-form-timepicker v-model="form.time" locale="en"></b-form-timepicker>
      </b-form-group>

      <b-form-group
        class="text-white"
        id="input-group-3"
        label="Doctor:"
        label-for="input-3"
      >
        <b-form-select
          id="input-3"
          v-model="form.user_id"
          :options="options"
          required
        ></b-form-select>
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
        email: "",
        name: "",
        user_id: null,
      },
      options: [{ text: "Select One", value: null }],
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
      let id = self.$route.params.id;

      self.showLoader = true;

      if (process.browser) {
        token = localStorage.getItem("auth._token.laravelJWT");
      }

      self.$axios
        .get(`http://api.laradoctors.test/api/disponibilities/${id}`, {
          Authorization: token,
        })
        .then((response) => {
          self.form = response.data;
          self.form.time = new Date(self.form.date)
            .toTimeString()
            .toString()
            .substring(0, 8);
          self.form.date = new Date(self.form.date)
            .toLocaleString("en-za")
            .toString()
            .substring(0, 10)
            .replace("/", "-")
            .replace("/", "-");
          self.default = self.form;
          self.showLoader = false;
        })
        .catch(function (error) {
          self.showLoader = false;
          console.log(error);
        });

      self.$axios
        .get(`http://api.laradoctors.test/api/doctors`, {
          Authorization: token,
        })
        .then((response) => {
          self.showLoader = false;

          self.options = [...this.options, ...response.data];
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
        .put(`http://api.laradoctors.test/api/disponibilities/${id}`, {
          user_id : this.form.user_id,
          date: `${this.form.date} ${this.form.time}`
        }, {
          Authorization: token,
        })
        .then((response) => {
          this.$router.push(`/disponibilities`);
          self.showLoader = false;
        })
        .catch(function (error) {
          self.showLoader = false;
          console.log(error);
        });
    },
    onReset(event) {
      event.preventDefault();
      this.$router.push(`/disponibilities`);
    },
  },
};
</script>