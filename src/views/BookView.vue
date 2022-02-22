<template>
  <div class="Book">
    <h1>This is an book page</h1>
        {{this.$store.state.auth.authenticated}}
          <bookable-list-item name="OUTPUT NAME WERKT"  :title=title :testarray = testarray />
          
          <!-- </bookable-list-item> -->

  </div>
</template>

<script>
import BookableListItem from "../components/BookableListItem.vue";

export default {
  components: {
    BookableListItem
  },
  data() {
    return {
      title: 'OUTPUT TITLE WERKT',
      testarray: {
          beh:"bla",
          kak:"kek",
      }
    }
  },
 
};
</script>


