<template>
  <div class="products">
      <h2>products index</h2>
      <div>{{products}}</div>
 </div>
</template>

<script>
// import ClientListItem from "../components/ClientListItem.vue";

export default {
//   components: {
//     ClientListItem,
//   },
  data() {
    return {
      products: null,
      loading: false,
    
    };
  },
  computed: {},
  methods: {},
  created() {
    this.loading = true;

    axios.get("/api/product").then(response => {
      this.products = response.data.data;
      this.loading = false;
    });
    console.log("leufk")

    // axios.get("/api/product").then((response) => {
    //   console.log("call api/product");
    //   console.log(response.data);
    // //   this.clients = response.data.reverse();
    //   this.loading = false;
    //   console.log("done with api call")
    // });
  }
};
</script>