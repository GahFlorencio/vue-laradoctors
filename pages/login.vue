<template>
  <div
    class="container d-flex flex-column align-items-center justify-content-center vh-100 login-container"
  >
    <b-alert
      class="position-absolute sticky-top"
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      Email and Password Incorrects.
    </b-alert>

    <form @submit.prevent="login">
      <h3>Laradoctors</h3>

      <div class="form-group">
        <label>Email</label>
        <input
          v-model="fields.email"
          type="email"
          class="form-control form-control-lg"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          v-model="fields.password"
          type="password"
          class="form-control form-control-lg"
        />
      </div>

      <button
        :disabled="fields.email === '' || fields.password === ''"
        type="submit"
        class="btn btn-dark btn-lg btn-block"
      >
        Log In
      </button>
    </form>
  </div>
</template>


<script>
export default {
  layout:"login",
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      fields: {
        email: "",
        password: "",
      },
      isLoading: false,
      errors: null,
    };
  },
  methods: {
    async login() {
      this.isLoading = true;

      this.$auth
        .loginWith("laravelJWT", {
          data: {
            email: this.fields.email,
            password: this.fields.password,
          },
        })
        .then((response) => {
          this.isLoading = false;
          this.$router.push("/");
        })
        .catch((erro) => {
          
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #282a36;
}
h3,
label,
button {
  color: #bd93f9;
}
button:hover {
  color: #bd93f9;
}
</style>