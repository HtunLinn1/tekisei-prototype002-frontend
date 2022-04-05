<template>
  <v-container class="pt-15" fluid-width>
    <h1 class="pt-3">
      Login
    </h1>
    <Notification v-if="error" :message="error" class="mb-4 pb-3" />
    <v-form ref="login_form">
      <v-text-field
        v-model="email"
        type="email"
        label="Email"
        :rules="[required]"
        prepend-icon="mdi-email"
      />
      <v-text-field
        v-model="password"
        label="Password"
        :rules="[required, min_length, max_length]"
        prepend-icon="mdi-lock"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      />
      <v-btn color="primary" @click="login">
        Login
      </v-btn>
      <div class="pt-4">
        <nuxt-link to="/signup">
          <v-icon color="primary" small>
            mdi-account-plus
          </v-icon>
          Create Account
        </nuxt-link>
      </div>
      <div class="pt-4">
        <nuxt-link to="/signup">
          Password Reset
        </nuxt-link>
      </div>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    name: 'LoginPage',
    middleware: 'auth',
    data() {
      return {
        email: '',
        password: '',
        error: null,
        message: '',
        showPassword: false,
        required: value => !!value || '必須です',
        min_length: value => value.length >= 8 || '短すぎです',
        max_length: value => value.length <= 20 || '長すぎです'
      }
    },
    methods: {
      async login() {
        await this.$auth.loginWith('local', {
          data: {
            password: this.password,
            email: this.email
          }
        })
        .then(
          (response) => {
          },
          (error) => {
            this.error = error.response.data.errors
          }
        )
      }
    }
  }
</script>

<style></style>