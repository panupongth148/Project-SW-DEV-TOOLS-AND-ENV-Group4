<template>
  <section id="app">
    <div class="container is-wildscreen my-5">
      <p class="is-size-3">จัดการสินค้า</p>
      <div class="column is-12 is-multiline">
        <div
          class="column is-12"
          v-for="(book, index) in books"
          :key="book.book_id"
        >
          <p class="is-size-5">สินค้าชิ้นที่ {{ index + 1 }}</p>

          <div class="box columns m-5 has-text-centered">
            <div class="column is-4">
              <figure class="image">
                <img
                  style="height: 320px; width: 60%"
                  :src="imagePath(book.image)"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="column is-5 mt-3">
              <label class="label">{{ book.book_name }}</label>
            </div>
            <div class="column is-2 mt-2">
              <router-link
                :to="{ name: 'editBook', params: { bookId: book.id } }"
                > <label class="label has-text-link" :data-test="'editBook' + index"><u>แก้ไขสินค้า</u></label> </router-link
              >
            </div>
            <div class="column is-1 mt-1">
              <button class="button" @click="deleteBook(book.id, index)">
                <label class="label" :data-test="'deleteBook' + index">ลบสินค้า</label>
              </button>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <button>
              <router-link :to="{ name: 'addBook', params: { storeId: this.$route.params.storeId} }">
                <label class="label has-text-link" data-test="addBook">เพิ่มสินค้า</label>
              </router-link>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "Home",
  data() {
    return {
      search: "",
      books: [],
    };
  },

  mounted() {
    console.log("in mounted")
    this.getBookOfStore(this.$route.params.storeId);
  },
  methods: {
    getBookOfStore(id) {
    console.log(id)
      axios
        .get(`https://immense-mesa-76111.herokuapp.com/store/managebook/${id}`)
        .then((response) => {
          this.books = response.data.book;
          console.log(this.books)
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    imagePath(file_path) {
      
      if (file_path) {
        return "https://immense-mesa-76111.herokuapp.com/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    shortContent(content) {
      if (content.length > 200) {
        return content.substring(0, 197) + "...";
      }
      return content;
    },
    deleteBook(id) {
      let confirmDeleteBook = confirm("Are you sure to delete this book");
      if (confirmDeleteBook) {
        axios
          .delete(`https://immense-mesa-76111.herokuapp.com/store/managebook/deletebook/${id}`)
          .then(() => {
            location.reload()
          })
          .catch((error) => {
            this.error = error.response.data.message;
          });
      }
    },
  },
};
</script>