<template>
  <div>
    <v-simple-table>
      <template #default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
          >
            <td>{{ user.email }}</td>
            <td>
              <v-btn v-if="user.email !== uid" icon color="error" @click="remove(user.id)">
                <v-icon small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import UsersApi from '~/plugins/axios/user/user'
export default {
  name: 'UserListPage',
  data() {
    return {
      users: [],
      error: '',
      uid: localStorage.getItem("uid")
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      await UsersApi.getUsers()
      .then(
        (response) => {
          this.users = response.data.users
        },
        (error) => {
          this.error = error.data.errors.full_messages
        }
      )
    },
    async remove (userId) {
      await UsersApi.deleteUser(userId)
      .then(
        (response) => {
          console.log(response)
          this.getUserList()
        },
        (error) => {
          console.log(error)
        }
      )
    }
  },
}
</script>