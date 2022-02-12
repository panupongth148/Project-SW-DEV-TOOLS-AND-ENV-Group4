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
                  :src="imagePath(book.image_source)"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="column is-5 mt-3">
              <label class="label">{{ book.book_name }}</label>
            </div>
            <div class="column is-2 mt-2">
              <router-link
                :to="{ name: 'editBook', params: { bookId: book.book_id } }"
                > <label class="label has-text-link"><u>แก้ไขสินค้า</u></label> </router-link
              >
            </div>
            <div class="column is-1 mt-1">
              <button class="button" @click="deleteBook(book.book_id, index)">
                <label class="label">ลบสินค้า</label>
              </button>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <button>
              <router-link :to="{ name: 'addBook', params: { storeId: this.$route.params.storeId} }">
                <label class="label has-text-link">เพิ่มสินค้า</label>
              </router-link>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      search: "",
      books: [],
    };
  },

  mounted() {
    
  },
  methods: {

  },
};
</script>