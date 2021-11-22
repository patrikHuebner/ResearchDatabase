<template>
  <h1>Books</h1>

  <div class="bookList">
    <ul>
      <li v-for="(book, index) in books" :key="index">
        <div class="book_container">
          <img
            v-if="book.COVER == 'NULL'"
            :src="pathToImages + '_noCover.jpg'"
            :alt="book.TITLE"
          />
          <img v-else :src="pathToImages + book.COVER" :alt="book.TITLE" />

          <div class="book_details">
            <div class="book_author">{{ fullNames(book.AUTHOR) }}</div>
            <div class="book_title">{{ book.TITLE }}</div>
            <div class="book_subtitle">{{ book.SUBTITLE }}</div>
            <div class="book_publishingDetails">
              {{ book.PLACE_OF_PUBLICATION
              }}<span v-if="book.PLACE_OF_PUBLICATION">,</span>
              {{ book.YEAR_OF_PUBLICATION }}<br />{{ book.PUBLISHER }}
            </div>
          </div>
        </div>
        <div class="copyCitation">Copy citation</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { databaseManager } from "@/App.vue";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  methods: {
    fullNames: function (authorString) {
      let names = "";

      let authors = JSON.parse(authorString);
      for (let index in authors) {
        names += authors[index].firstName + " " + authors[index].lastName;
        // Add commas for each author except the last one
        if (authors.length > 0 && index < authors.length - 1) {
          names += ", ";
        }
      }

      return names;
    },
  },
  setup() {
    const store = useStore();
    let pathToImages =
      store.state.databaseAPI.server +
      ":" +
      store.state.databaseAPI.port +
      "/store/bookCovers/";
    let books = ref(null);

    databaseManager.get({ route: "/api/books" }).then((result) => {
      // result is "false" when an error has occured. Only proceed if that is not the case.
      if (result) {
        books.value = result.result;
      }
    });

    return { books, pathToImages };
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/theming.scss";
@import "@/assets/styles/theming/colorDefinitions.scss";

.bookList {
  ul {
    display: flex;
    justify-content: flex-start;
    padding: 0;
  }
  li {
    @include theme(color, primaryColor);

    list-style-type: none;
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 20px 20px 10px 20px;
    cursor: pointer;
    max-width: 33vw;
    margin: 20px 20px 20px 0;
    @include theme(border, backgroundLight, 1px solid);
    @include theme(background-color, backgroundLight);
    border-radius: 10px;

    &:hover {
      @include theme(border, primaryColor, 1px solid);
    }

    .book_container {
      display: flex;
      flex-direction: row;
    }

    img {
      height: 200px;
      margin: 0 20px 0 0;
      border-radius: 10px;

      -webkit-box-shadow: 0px 12px 35px 0px rgba(0, 0, 0, 0.71);
      box-shadow: 0px 12px 35px 0px rgba(0, 0, 0, 0.71);
    }

    .book_author {
      margin-bottom: 10px;
    }
    .book_title {
      font-size: 20px;
      font-weight: bold;
    }
    .book_subtitle {
      margin-bottom: 15px;
      font-style: italic;
      font-size: 14px;
    }
    .book_publishingDetails {
      font-size: 12px;
    }
    .copyCitation {
      align-self: flex-end;
      padding: 5px;
      background: color(lightGray);
      color: color(black);
      font-size: 10px;
      border-radius: 10px;
      display: inline-block;
      cursor: pointer;
      &:hover {
        background: color(green);
        color: color(white);
      }
    }
  }
}
</style>