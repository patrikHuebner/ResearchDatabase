<template>
  <div id="container">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
// Vue
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";

// Database Manager
import DatabaseManager from "@/database/DatabaseManager.js"; // Import the component
let databaseManager = ref(null); // Reference to the databaseManager that handles database operations
export { databaseManager }; // Export databaseManager reference to expose it to other components

// Navigation
import Navigation from "@/components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
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
