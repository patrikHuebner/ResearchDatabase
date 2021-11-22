<template>
  <div id="nav">
    <div id="nav_applicationSections">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'Books' }">Books</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>

    <div id="nav_secondaryFeatures">
      <div id="toggleTheme" @click="toggleTheme">Toggle theme</div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    function toggleTheme() {
      document.documentElement.className == "light"
        ? (document.documentElement.className = "dark")
        : (document.documentElement.className = "light");

      store.dispatch("updateState", {
        parent: "theme",
        key: "mode",
        value: document.documentElement.className,
      });
    }

    return { toggleTheme };
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/theming.scss";
@import "@/assets/styles/theming/colorDefinitions.scss";

#nav {
  margin: 20px 0 20px 0;
  display: flex;
  justify-content: space-between;

  #nav_secondaryFeatures {
    #toggleTheme {
      background: color(lightGray);
      color: color(black);
      font-size: 10px;
      border-radius: 10px;
      padding: 5px;
      cursor: pointer;
      margin-left: auto;

      &:hover {
        background: color(green);
        color: color(white);
      }
    }
  }

  a {
    font-weight: bold;
    @include theme(color, primaryColor);
    &:hover {
      text-decoration: none;
    }

    &.router-link-exact-active {
      @include theme(color, primaryColorOn);
    }
  }
}
</style>