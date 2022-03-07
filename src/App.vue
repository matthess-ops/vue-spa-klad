<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |

      <template v-if="!authenticated">
        <router-link to="/signin">Sign in</router-link> |
      </template>
      <template v-else>
        <router-link to="/account">{{ user.name }}</router-link> |
        <a href="#" @click.prevent="signOut">Sign out</a>|
        <router-link to="/book">Book</router-link> |
                <router-link to="/clients">Clients</router-link> |
                <router-link to="/products">Products</router-link> |

        <template v-if="isAdmin">

          <router-link to="/admin">Admin</router-link> |
      </template>

     
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        authenticated: 'auth/authenticated',
        user: 'auth/user',
        isAdmin: 'auth/isAdmin'

      })
    },

    methods: {
      ...mapActions({
        signOutAction: 'auth/signOut'
      }),

      async signOut () {
        await this.signOutAction()

        this.$router.replace({ name: 'home' })
      }
    }
  }
</script>