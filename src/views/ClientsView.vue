<template>
  <div class="clients">
    <h1>file upload</h1>

     

    <h3>test update client</h3>
    <button class="btn btn-danger" @click="updateClient(14)">updateClient</button>


    <h4 class="text-center">Add Client</h4>
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="saveClient">
          <div class="form-group">
            <label>Firstname</label>
            <input
              type="text"
              class="form-control"
              v-model="client.firstName"
              :class="{'is-invalid' : errors.hasOwnProperty('firstName')}"
            />
              <div class="invalid-feedback">
              <!-- <div v-for="error in errors.firstName" >
            {{ error }}   
            </div> -->
    </div>
          </div>
          <br />
          <div class="form-group">
            <label>LastName</label>
            <input type="text" class="form-control" v-model="client.lastName" />
          </div>
          <br />
          <button type="submit" class="btn btn-primary">Add client</button>
        </form>
      </div>
    </div>
    <div v-if="loading">Data is loading...</div>
    <div v-else>
      <div v-for="client in clients" :key="client.id">
        <!-- {{ client.city }} -->

        <client-list-item
          v-bind="client"
          @clicked="onClickChild"
        ></client-list-item>
      </div>

      <!-- {{clients}} -->
    </div>
  </div>
</template>

<script>
import ClientListItem from "../components/ClientListItem.vue";

export default {
  components: {
    ClientListItem,
  },
  data() {
    return {
      clients: null,
      loading: false,
      client: {
        firstName: "updateclient",
        lastName: "updateclient",
      },
      errors:{},
    };
  },
  computed: {},
  methods: {
      handleFileObject() {
        this.avatar = this.$refs.file.files[0]
        this.avatarName = this.avatar.name
      },
    onClickChild(value) {
      console.log("remove ths id " + value); // someValue
      this.clients = this.clients.filter((client) => client.id !== value);
    },
    updateClient(id){
      console.log("update client id "+id)
      axios.put('/api/client/'+id, this.client)
                 .then((res) => {
                   console.log("update worked");
                 })
                 .catch((error) => {
                   console.log("errors are")
                   console.log(error.response.status)
                   console.log(error.response.data.errors)
                  
                 }).finally(() => {
                     //Perform action in always
                 });
    },

    saveClient() {
      console.log("add this client " + this.client.firstName);

      // let data = new FormData();
      // data.append("firstName", this.testdata);
      // console.log("this is data ",data)

       axios.post('/api/createclient', this.client)
                 .then((res) => {
                     //Perform Success Action
                     console.log("added succesfully")
                     this.errors={}
                 })
                 .catch((error) => {
                   console.log("errors are")
                   console.log(error.response.status)
                   console.log(error.response.data.errors)
                   this.errors = error.response.data.errors
                   console.log("the saved errors")
                   console.log(this.errors.firstName)
                     // error.response.status Check status code
                 }).finally(() => {
                     //Perform action in always
                 });
    },
  },
  created() {
    this.loading = true;

    axios.get("/api/clientdata").then((response) => {
      console.log("dit werkt");
      console.log(response.data);
      this.clients = response.data.reverse();
      this.loading = false;
    });
  },
};
</script>
