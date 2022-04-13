<template>
  <v-app-bar
    app
    color="#95A5A6"
    flat
  >
    <v-row class="pl-3">
      <nuxt-link class="header" to="/">
        <h3 class="text">
          Prototype
        </h3>
      </nuxt-link>&nbsp;&nbsp;&nbsp;
    </v-row>
    <v-spacer />
    <v-responsive max-width="100">
      <v-btn
        v-if="$auth.loggedIn"
        rounded
        depressed
        @click="logout"
      >
        Logout
      </v-btn>
      <v-btn
        v-if="!$auth.loggedIn"
        rounded
        depressed
        to="/login"
      >
        Login
      </v-btn>
    </v-responsive>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      .then(()=>{
          localStorage.removeItem("access-token")
          localStorage.removeItem("client")
          localStorage.removeItem("uid")
          localStorage.removeItem("token-type")

          localStorage.removeItem("user-admin")
          localStorage.clear()
        }
      )
    }
  },
}
</script>

<style scoped>
a.nuxt-link-exact-active {
    font-weight: bold;
}

a,
a:visited {
  text-decoration: none;
  color: inherit;
}
.text {
  color: white;
}
</style>
