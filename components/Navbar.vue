
<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="/schedules">Laradoctors</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
       
        <b-nav-item href="/users">Users</b-nav-item>
        <b-nav-item href="/disponibilities">Disponibilities</b-nav-item>
        <b-nav-item href="/schedules">Schedules</b-nav-item>
      </b-navbar-nav>
      

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
       

        

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{loggedInUser.name}}</em>
          </template>
          <b-dropdown-item @click="logout" href="#">Log Out</b-dropdown-item>
          
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  <!-- <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/"><strong>Auth Demo</strong></nuxt-link>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <nuxt-link class="navbar-item" to="/">Home</nuxt-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div v-if="!isAuthenticated" class="buttons">
            <nuxt-link class="button is-primary" to="/login">Log in</nuxt-link>
          </div>
          <div v-else class="buttons">
            <button type="button" @click="logout" class="button is-primary">Log out</button>
          </div>
        </div>
      </div>
    </div>
  </nav> -->
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>