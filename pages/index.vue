<template>
  <v-container>
    <v-row justify="center" align="center" class="pt-10">
      <v-col cols="12">
        <UserList v-if="userAdmin" />
        <TestTop v-else />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "IndexPage",
  middleware: "auth",
  data() {
    return {
      userAdmin: ""
    };
  },
  mounted() {
    this.userAdmin = JSON.parse(localStorage.getItem("user-admin"));
  }
}
</script>
