<template>
  <h1>Books</h1>

  <div class="bookList">
    <ul>
      <li v-for="(book, index) in books" :key="index">
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
        if (authors.length > 0 && index < authors.length-1) {
          names+=', '
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
.bookList {
  ul {
    display: flex;
    justify-content: flex-start;
    padding: 0;
  }
  li {
    list-style-type: none;
    text-align: left;
    display: flex;
    padding: 10px 10px;
    cursor: pointer;
    max-width: 30vw;
    margin: 20px;
    border: 1px solid #000;
    border-radius: 10px;

    &:hover {
      background: rgb(240, 240, 240);
    }

    img {
      height: 200px;
      margin: 0 20px 0 0;
      border-radius: 10px;
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
  }
}

// .bookElement {
//   margin: 20px;

//   border: 1px solid #000;
//   border-radius: 10px;

//   img {
//     height: 200px;
//     margin: 0 20px 0 0;
//     border-radius: 10px;
//   }
// }
</style>