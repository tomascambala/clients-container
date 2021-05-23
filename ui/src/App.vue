<template>
  <div id="app">
    <Clients />
  </div>
</template>

<script>
import Clients from "./views/Clients.vue";

export default {
  name: "App",
  components: {
    Clients,
  },
};
</script>

<style>
#app {
  width: 90%;
  min-width: 48.125rem;
  margin: auto;
  padding-top: 3.125rem;
}
</style>
