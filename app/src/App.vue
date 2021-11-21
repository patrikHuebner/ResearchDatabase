<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script>
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import DatabaseManager from "@/database/DatabaseManager.js";
let databaseManager = ref(null); // reference to the databaseManager that handles database operations
export { databaseManager }; // export databaseManager reference to expose it to other components

export default {
  name: "App",
  components: {},
  setup() {
    const store = useStore();

    // Initialize the database manager
    databaseManager = new DatabaseManager({
      server: store.state.databaseAPI.server,
      port: store.state.databaseAPI.port
    });
  },
};
</script>

<style lang="scss">
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
