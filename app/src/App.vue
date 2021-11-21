<template>
  <div id="nav">
    <router-link :to="{ name: 'Home' }">Home</router-link> |
    <router-link :to="{ name: 'Books' }">Books</router-link> |
    <router-link :to="{ name: 'About' }">About</router-link>
  </div>
  <router-view />
</template>

<script>
// Vue
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";

// Database Manager
import DatabaseManager from "@/database/DatabaseManager.js"; // Import the component
let databaseManager = ref(null); // Reference to the databaseManager that handles database operations
export { databaseManager }; // Export databaseManager reference to expose it to other components

export default {
  name: "App",
  components: {},
  setup() {
    const store = useStore();

    // DATABASE MANAGER: INITIALIZE ---------------------------------------------------------------------------------------------
    databaseManager = new DatabaseManager({
      server: store.state.databaseAPI.server,
      port: store.state.databaseAPI.port,
    });
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
