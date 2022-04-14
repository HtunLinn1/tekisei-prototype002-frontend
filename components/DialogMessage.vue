<template>
  <v-dialog v-model="dialog" :max-width="options.width" @keydown.esc="cancel">
    <v-card>
      <v-toolbar dark :color="options.color" dense>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!!message">{{ message }}</v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" @click.native="agree">Yes</v-btn>
        <v-btn color="grey" @click.native="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import UsersApi from '~/plugins/axios/user/user'
export default {
  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    message: null,
    title: null,
    options: {
      color: 'primary',
      width: 290
    },
    userId: null
  }),
  methods: {
    open(title, message, userId, options) {
      this.userId = userId
      this.dialog = true
      this.title = title
      this.message = message
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    async agree() {
      if (this.userId !== '') {
        await UsersApi.deleteUser(this.userId)
        .then(
          (response) => {
            this.resolve(true)
            this.dialog = false
          },
          (error) => {
            console.log(error)
          }
        )
      } else if (this.userId === '') {
        this.resolve(true)
        this.dialog = false
      }
    },
    cancel() {
      this.resolve(false)
      this.dialog = false
    }
  }
}
</script>