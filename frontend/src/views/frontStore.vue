<template>
  <section id="app">
    <div class="container is-wildscreen">
      <div class="columns has-background-warning mt-6">
        <div class="column is-6 mt-3">
          <div class="columns is-vcentered">
            <div class="column is-6">
              <figure class="image is-64x64 pl-3 pt-2">
                <img src="../assets/user.png" />
              </figure>
            </div>
            <div class="column is-6">
              <label class="label"> {{ storeData.store_name }} </label>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="columns is-centered">
            <div class="column is-10 box m-3">
              <p>รายการสินค้า : {{ books.length }} ชิ้น</p>
              <p>คะแนน : {{ storeData.rating }}</p>
              <p>วันที่สร้าง : {{ storeData.dob.substring(0, 10) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column"></div>
      </div>
      <h2 class="is-size-3">รายการสินค้า</h2>
      <div class="columns">
        <div class="column">
          <div class="columns is-multiline mt-5">
            <div class="column is-3" v-for="book in books" :key="book.Book_id">
              <div class="card">
                <div class="card-image pt-5">
                  <figure class="image">
                    <img
                      style="height: 300px"
                      :src="imagePath(book.image_source)"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <div class="card-content">
                  <div>
                    <label class="label">{{ book.book_name }}</label>
                  </div>
                  <div>
                    <p>ราคา : {{ book.book_price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

export default {
    name: "frontStore",
    data() {
        return {
            search: "",
            books: [],
            storeData: [{store_name: "Book 1", rating: 5, dob: "01-01-2000"}],
        };
    },

    mounted() {

    },
    methods: {

    },
};
</script>