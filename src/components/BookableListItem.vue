<template>
  <div class="bookchild">
    <h1>this book child component</h1>
  <p> this is the name prop {{ name }}</p>
    <p> this is the title prop {{ title }}</p>
    {{testarray}}

  </div>
</template>

<script>
export default {
  props: [
    'name',
    'title',
    'testarray'
    ]

  
}
</script>

