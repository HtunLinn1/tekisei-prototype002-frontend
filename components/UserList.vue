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
            <td>{{ user.email }} {{ user.id }}</td>
            <td>
              <v-btn v-if="user.email !== uid" icon color="error" @click="remove(user.id)">
                <v-icon small>
                  mdi-delete
                </v-icon>
              </v-btn>
            </td>
            <!-- <td>
              <v-row justify="center">
                <v-dialog v-model="dialogDelete"  max-width="350" persistent :retain-focus="false">
                  <template #activator="{ on, attrs  }">
                    <v-btn
                      v-if="uid !== user.email"
                      size="x-small"
                      icon
                      color="red"
                      v-bind="attrs"
                      v-on="on"
                    >
                    <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>Do you want to delete this user? {{ user.id }}</v-card-title>
                    <v-card-actions>
                      <v-btn color="primary" text @click="dialogDelete = false">
                        Close
                      </v-btn>
                      <v-btn color="primary" text @click="remove(user.id)">
                        Delete
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </td> -->
          </tr>
        </tbody>
        <UserDeleteDialog ref="confirm" />
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
      console.log('--onClickOpen')
      if (await this.$refs.confirm.open('Delete', 'Are you sure want to delete?', userId, { color: 'red' })) {
        console.log('--yes')
        this.getUserList()
      }else{
        console.log('--no')
      }
    }
  },
}
</script>