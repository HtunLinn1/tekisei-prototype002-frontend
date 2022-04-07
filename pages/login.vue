<template>
  <v-container class="pt-15" fluid-width>
    <div v-if="message" class="pt-3">
      <v-alert
        type="success"
      >
        {{ message }}
      </v-alert>
    </div>
    <v-card
      class="my-10 pa-md-4 mx-auto pa-5"
      max-width="500"
    >
    <h1 class=" text-center">
      Login
    </h1>
    <Notification v-if="error" :message="error" />
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
      <div class="text-center">
        <v-btn color="primary" @click="login">
          Login
        </v-btn>
      </div>
      <v-row class="pt-5 d-flex justify-space-around mb-2">
        <nuxt-link to="/signup">
          <v-icon color="primary" small>
            mdi-account-plus
          </v-icon>
          Create Account
        </nuxt-link>
        <nuxt-link to="/password_reset">
          Password Reset
        </nuxt-link>
      </v-row>
    </v-form>
    </v-card>
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
        message: null,
        showPassword: false,
        required: value => !!value || '必須です',
        min_length: value => value.length >= 8 || '短すぎです',
        max_length: value => value.length <= 20 || '長すぎです'
      }
    },
    mounted() {
      this.message = this.$route? this.$route.params.message : null
    },
    methods: {
      async login() {
        if (this.$refs.login_form.validate()) {
          await this.$auth.loginWith('local', {
            data: {
              password: this.password,
              email: this.email
            }
          })
          .then(
            (response) => {
              console.log(response)
              this.error = null
            },
            (error) => {
              console.log(error)
              this.error = error.response.data.errors
            }
          )
        } else {
          this.error = ['入力エラーがあります']
        }
      }
    }
  }
</script>

<style></style>