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
      <h2 class="pt-3 pb-5 text-center">
        Reset Password
      </h2>
      <Notification v-if="error" :message="error" class="mb-4 pb-3" />
      <v-form ref="password_reset">
        <v-text-field
          v-model="email"
          type="email"
          label="Email"
          :rules="[required]"
          prepend-icon="mdi-email"
        />
        <div class="text-center">
          <v-btn color="primary" @click="send">
            send
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'PasswordResetPage',
  data() {
    return {
      email: '',
      required: value => !!value || '必須です',
      error: '',
      message: null
    }
  },
  methods: {
    async send () {
      if (this.$refs.password_reset.validate()) {
        await this.$axios.post('/v1/auth/password',{
          email: this.email,
          redirect_url: "http://localhost:3000/password_edit"
        }).then(
            (response) => {
              console.log(response)
              this.error = null
              this.message = response.data.message
            },
            (error) => {
              console.log(error)
              this.error = error.response.data.errors
              this.message = null
            }
          )
      } else {
        this.error = ['入力エラーがあります']
      }
    }
  },
}
</script>