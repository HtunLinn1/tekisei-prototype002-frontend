<template>
  <v-container class="pt-15">
    <h1>Sign Up</h1>
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
        type="password"
        :rules="rules.password"
        prepend-icon="mdi-lock"
      />
      <v-text-field
        v-model="password_confirmation"
        label="Confirm Password"
        type="password"
        :rules="[required]"
        prepend-icon="mdi-lock"
        class="pb-2"
      />
      <v-btn color="success" @click="signup">
        Signup
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>

export default{
  name: 'SignupPage',
  data() {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: null,
      message: '',
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
      try{
        await this.$axios.post('/v1/auth',{
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            confirm_success_url: "http://localhost:3001"
        }).then((response) => {
          this.error = ''
          this.$router.push('/login')
        })   
      }catch(e){
        this.error = e.response.data.errors.full_messages
      }
    }
  }
}
</script>

<style></style>