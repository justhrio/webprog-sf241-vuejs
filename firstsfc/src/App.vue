App.vue
 
<template>
  <h1>Food</h1>
  <food-item class="green"/>
  <food-item class="green"/>
  <food-item class="green"/>

  <food-item2 class="pink"/>
  <food-item2 class="pink"/>
  <food-item2 class="pink"/>
</template>
 
<script></script>
 
<style></style>
 
 
<style>
 #app > div {
    border: dashed black 1px;
    display: inline-block;
    margin: 10px;
    padding: 10px;
 }

 /* Specific colors */
  .green {
    background-color: lightgreen;
  }

  .pink {
    background-color: rgb(255, 0, 234);
  }
</style>



