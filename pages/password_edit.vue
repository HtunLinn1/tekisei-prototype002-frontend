<template>
  <v-container class="pt-15" fluid-width>
    <v-card
      class="my-10 pa-md-4 mx-auto pa-5"
      max-width="500"
    >
      <h1 class="pt-3 text-center">
        Password Reset
      </h1>
      <Notification v-if="error" :message="error" class="mb-4 pb-3" />
      <v-form ref="login_form">
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
          prepend-icon="mdi-lock"
          :rules="[required]"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          class="pb-2"
          @click:append="showPassword = !showPassword"
        />
        <div class="text-center">
          <v-btn color="primary" @click="reset">
            Reset
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'PasswordEditPage',
  data() {
    return {
      password_confirmation: '',
      password: '',
      error: null,
      showPassword: false,
      rules: {
        password: [
          value => !!value || '必須です',
          value => value.length >= 8 || '短すぎです',
          value => value.length <= 20 || '長すぎです',
          value => (value && value.match(/^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))([a-zA-Z0-9])+$/)) ||
          'Password must contain at least 1 upper case letter, 1 lower case letter'
        ],
      },
      required: value => !!value || '必須です'
    }
  },
  methods: {
    async reset () {
      await this.$axios.put('/v1/auth/password',{
        reset_password_token: this.$route.query.reset_password_token,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
      .then(
        (response) => {
          this.$router.push({ name: 'login', params: { message: 'パスワードをリセットしました' }})
        },
        (error) => {
          this.error = error.response.data.errors.full_messages
        }
      )
    }
  },
}
</script>