<template>
  <div >
    {{id+" "+firstName + " "+lastName}}

    <button class="btn btn-danger" @click="deleteClient(id)">Delete</button>

  </div>
</template>

<script>
export default {
  props: {  firstName: String, id: Number, lastName:String },
methods:{
  deleteClient(id){
    console.log("lcik werkt "+id)
      axios.post('/api/deleteClientData/'+id).then(response => {
        console.log("client removed")
            // location.reload()
          this.$emit('clicked', id)

    });
  }
}

    
};
</script>

