<template>
  <div class="about">
    <h1>This is admin view</h1>
    <div v-if="is_admin">
      has admin state
    </div>
    <div v-else>
      has not admin state
    </div>
    <!-- {{is_admin}}
    asdfasf -->
  </div>
</template>


<script>
export default {
    data() {
    return {
      is_admin: false,
    
    };
  },
  created() {
    this.is_admin = this.$store.state.auth.user.is_admin
    // console.log(this.$store.state)
  },
}
</script>