<template>
  <v-container class="pt-15">
    <v-card
      class="my-10 pa-md-4 mx-auto pa-5"
      max-width="500"
    >
      <h1 class="text-center">Sign Up</h1>
      <Notification v-if="error" :message="error" class="mb-4 pb-3" />
      <v-form ref="signup_form">
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
          :rules="rules.password"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
        />
        <v-text-field
          v-model="password_confirmation"
          label="Confirm Password"
          :rules="[required]"
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          class="pb-2"
          @click:append="showPassword = !showPassword"
        />
        <v-checkbox
          v-model="adminCheck"
          label="Admin"
        ></v-checkbox>
        <div class="text-center">
          <v-btn color="success" @click="signup">
            Signup
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import SignUpApi from '~/plugins/axios/user/user'
export default{
  name: 'SignupPage',
  data() {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: null,
      showPassword: false,
      message: '',
      adminCheck: false,
      rules: {
        password: [
          value => !!value || '必須です',
          value => (value && value.length >= 8) || '短すぎです',
          value => (value && value.length <= 20) || '長すぎです',
          value => (value && value.match(/^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))([a-zA-Z0-9])+$/)) ||
          'Password must contain at least 1 upper case letter, 1 lower case letter'
        ]
      },
      required: value => !!value || '必須です'
    }
  },
  methods: {
    async signup() {
      const signUpParams = {
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation,
        admin: this.adminCheck,
        confirm_success_url: process.env.CONFIRM_SUCCESS_URL
      }
      await SignUpApi.signUp(signUpParams)
      .then(
        (response) => {
          this.error = ''
          this.$router.push('/login')
        },
        (error) => {
          this.error = error.data.errors.full_messages
        }
      )
    }
  }
}
</script>

<style></style>