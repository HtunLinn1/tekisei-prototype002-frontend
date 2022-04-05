<template>
  <v-app-bar
    app
    color="#95A5A6"
    flat
  >
    <div class="pl-3">
      <nuxt-link to="/">
        <h3 class="text">
          Stress Check
        </h3>
      </nuxt-link>
    </div>
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
      >
        Login
      </v-btn>
    </v-responsive>
  </v-app-bar>
</template>

<script>
export default {
  mounted() {
    console.log(this.$auth)
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      .then(()=>{
          localStorage.removeItem("access-token")
          localStorage.removeItem("client")
          localStorage.removeItem("uid")
          localStorage.removeItem("token-type")
        }
      )
    }
  },
}
</script>

<style>
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
