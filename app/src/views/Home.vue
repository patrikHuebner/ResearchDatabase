<template>
  <h2>Research Database</h2>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {},
  setup() {
    // console.log("Attempting to connect to database via API...");
    // connectToDatabase().then((result) => console.log(result));

    function connectToDatabase() {
      let server = {
        domain: "http://localhost",
        port: 3000,
      };

      return new Promise((resolve) => {
        fetch(server.domain + ":" + server.port, {
          mode: "cors",
        })
          .then((response) => response.json())
          .then((returnedData) => {
            resolve(returnedData);
          })
          .catch((error) => {
            console.warn(error);
          });
      });
    }
  },
};
</script>
