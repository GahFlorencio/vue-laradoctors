<template>
  <div class="w-100">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Name:"
        label-for="input-1"
        class="text-white"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          placeholder="Jonh Due"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Email:"
        label-for="input-2"
        class="text-white"
      >
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          placeholder="myfirhorribleemail@email.com"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Password:"
        label-for="input-3"
        class="text-white"
      >
        <b-form-input
          id="input-3"
          v-model="form.password"
          type="password"
          placeholder="secret"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        class="text-white"
        id="input-group-4"
        label="Type:"
        label-for="input-4"
      >
        <b-form-select
          id="input-4"
          v-model="form.user_type_id"
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
        user_type_id: null,
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
      let user_id = self.$route.params.id;

      self.showLoader = true;

      if (process.browser) {
        token = localStorage.getItem("auth._token.laravelJWT");
      }

      self.$axios
        .get(`http://api.laradoctors.test/api/types`, {
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
      let user_id = self.$route.params.id;

      self.showLoader = true;

      if (process.browser) {
        token = localStorage.getItem("auth._token.laravelJWT");
      }

      self.$axios
        .post(`http://api.laradoctors.test/api/users`, self.form, {
          Authorization: token,
        })
        .then((response) => {
          this.$router.push(`/users`);
          self.showLoader = false;
        })
        .catch(function (error) {
          self.showLoader = false;
          console.log(error);
        });
    },
    onReset(event) {
      event.preventDefault();
      this.$router.push(`/users`);
    },
  },
};
</script>