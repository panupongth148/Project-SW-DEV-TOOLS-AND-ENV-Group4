<template>
  <section id="app">
    <div class="container is-wildscreen my-5">
      <div class="header my-3"><p class="is-size-2">แก้ไขข้อมูลหนังสือ</p></div>
      <div class="columns mt-5">
        <div class="column is-12">
          <label class="label is-size-5">ชื่อหนังสือ</label>
          <input
            class="input mt-1"
            v-model="nameBook"
          />
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <label class="label is-size-5">รายละเอียดหนังสือ</label>
          <textarea
            class="textarea"
            v-model="bookDescription"
          ></textarea>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <label class="label is-size-5">ชนิดหนังสือ</label>
          <div class="select">
            <select v-model="bookType">
              <option value="book">หนังสือ</option>
              <option value="magazine">นิตยสาร</option>
            </select>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <label class="label is-size-5">หมวดหมู่หนังสือ</label>
          <input
            class="input mt-1"
            v-model="bookCategory"
          />
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <label class="label is-size-5">ราคาหนังสือ</label>
          <input class="input mt-1" v-model="bookPrice" />
        </div>
        <div class="column is-4">
          <label class="label is-size-5">จำนวน</label>
          <input class="input mt-1" v-model="bookCount" />
        </div>
        <div class="column is-4">
          <label class="label is-size-5">ราคาที่ลด</label>
          <input class="input mt-1" v-model="bookDiscount" />
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <div v-if="listImageBook.length > 0" class="columns is-multiline">
            <div
              v-for="image in listImageBook"
              :key="image.image_id"
              class="column is-one-quarter"
            >
              <div class="card">
                <div class="card-image">
                  <figure class="image">
                    <img
                      :src="'./' + image.image_source"
                      alt="Placeholder image"
                      height="100%"
                    />
                  </figure>
                </div>
                <footer class="card-footer">
                  <a
                    @click="deleteCurrentImage(image.image_id)"
                    class="card-footer-item has-text-danger"
                    >Delete</a
                  >
                  <span
                    @click="selectMainId = image.image_id"
                    class="icon card-footer-item"
                  >
                    <i
                      v-if="selectMainId === image.image_id"
                      class="fas fa-star mt-5"
                    ></i>
                    <i v-else class="far fa-star mt-5"></i>
                  </span>
                </footer>
              </div>
            </div>
          </div>
          <div class="control">
            <button @click="updateMainImage()" class="button is-link mb-2">
              Update Main
            </button>
          </div>

          <h1 class="is-size-4">New Image</h1>
          <input
            class="mb-5"
            multiple
            type="file"
            accept="image/png, image/jpeg, image/webp"
            @change="selectImages"
          />

          <div v-if="images" class="columns is-multiline">
            <div
              v-for="(image, index) in images"
              :key="image.id"
              class="column is-one-quarter"
            >
              <div class="card">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img
                      :src="showSelectImage(image)"
                      alt="Placeholder image"
                    />
                  </figure>
                </div>
                <footer class="card-footer">
                  <a
                    @click="deleteSelectImage(index)"
                    class="card-footer-item has-text-danger"
                    >Delete</a
                  >
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-1 is-offset-10">
          <button class="button is-primary is-medium" @click="submit()">
            ยืนยัน
          </button>
        </div>
        <div class="column is-1">
          <router-link
            :to="{ path: `/store/managebook/${this.books.store_id}` }"
          >
            <button class="button is-light is-medium">
              ยกเลิก
            </button></router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "Home",
  props: ["user"],
  data() {
    return {
      search: "",
      nameBook: "",
      bookDescription: "",
      bookCategory: "",
      bookPrice: "",
      bookCount: 1,
      bookType: "",
      images: [],
      listImageBook: [],
      countArrayImage: 0,
      bookDiscount: 0,
      bookId: "",
      store_id: "",
      selectMainId: null,
      books: '',
    };
  },

  mounted() {
    this.getImageForEdit(this.$route.params.bookId);
    this.getDataOfBook(this.$route.params.bookId);
    this.getStore()
  },
  methods: {
    async getDataOfBook(id) {
       console.log(id);
        await axios
        .get(`http://localhost:3000/book/detail/${id}`)
        .then((response) => {
          console.log(response.data)
          this.books = response.data
        })
        .catch((error) => {
        console.log("error")
          this.error = error.response.data.message;
        });
         //
          this.bookId = this.books.id;
          this.nameBook = this.books.book_name;
          this.bookDescription = this.books.book_description;
          this.bookCategory = this.books.book_category;
          this.bookCount = this.books.book_count;
          this.bookPrice = this.books.book_price;
          this.bookType = this.books.book_type;
          this.bookDiscount = this.books.book_discount;
          //this.selectMainId = this.listImageBook.filter(
          //  (x) => x.main === 1
         // )[0].image_id;

          this.store_id = this.books.store_id    
    },
  },
};
</script>