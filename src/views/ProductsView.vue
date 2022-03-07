<template>
  <div class="products">
    <h2>products index</h2>

    <div v-if="indexLoading">Data is loading...</div>
    <div v-else>
      <div v-for="product in products" :key="product.id">
        <div>
          {{
            product.id +
            " " +
            product.product_name +
            " " +
            product.product_amount
          }}
        </div>
      </div>
    </div>

    <div>
      <h2>add product</h2>
      <form @submit.prevent="storeProduct">
        <div class="form-group">
          <label>Product name</label>
          <input
            type="text"
            class="form-control"
            v-model="product.product_name"
            :class="{
              'is-invalid': storeProductErrors.hasOwnProperty('product_name'),
            }"
          />
          <div class="invalid-feedback">
            <div v-for="error in storeProductErrors.product_name" :key="error">
              {{ error }}
            </div>
          </div>
        </div>
        <div class="form-group">
          <label>Product code</label>
          <input
            type="text"
            class="form-control"
            v-model="product.product_code"
            :class="{
              'is-invalid': storeProductErrors.hasOwnProperty('product_code'),
            }"
          />
          <div class="invalid-feedback">
            <div v-for="error in storeProductErrors.product_code" :key="error">
              {{ error }}
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Product amount</label>
          <input
            type="number"
            class="form-control"
            v-model="product.product_amount"
            :class="{
              'is-invalid': storeProductErrors.hasOwnProperty('product_amount'),
            }"
          />
          <div class="invalid-feedback">
            <div v-for="error in storeProductErrors.product_amount" :key="error">
              {{ error }}
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-primary">Add Product</button>
      </form>     
    </div>


    <div>

      <h2>edit product</h2>
   <div class="form-group">
          <label>Product id</label>
          <input
            type="number"
            class="form-control"
            v-model="editProduct.id"
            :class="{
              'is-invalid': editProductErrors.hasOwnProperty('product_id'),
            }"
          />
          <div class="invalid-feedback">
            <div v-for="error in editProductErrors.product_amount" :key="error">
              {{ error }}
            </div>
          </div>
        </div>

    </div>

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
      indexLoading: false,
      storeLoading:false,
      product: {
        product_name: "test", //null,
        product_amount: 9, //null,
        product_code: "test99", //null,
      },

       editProduct: {
        product_id: 1, //null,

        product_name: "test", //null,
        product_amount: 9, //null,
        product_code: "test99", //null,
      },
      storeProductErrors: {},
      editProductErrors:{},
    };
  },
  computed: {},
  methods: {
    storeProduct() {
      this.storeLoading = true
      axios
        .post("/api/product", this.product)
        .then((res) => {
          this.indexProduct()
          // let newProduct = this.product
          // newProduct.id =999;
          // this.products.push(newProduct)
          console.log("success: add product");
          this.storeProductErrors = {};
        })
        .catch((error) => {
          if (error.response.status === 422) {
            console.log("error: add product form validation failed");
            this.storeProductErrors = error.response.data.errors;
          } else {
            console.log("error: critical error check out");
          }
        });
        this.storeLoading = false

    },
    indexProduct(){
        this.indexLoading = true;

    axios.get("/api/product").then((response) => {
      this.products = response.data.data;
      console.log(this.products)
      this.indexLoading = false;
    });
    }
  },
  created() {
    this.indexProduct()
  },
};
</script>