<template>
  <div class="container is-widescreen">
    <section class="section" id="app">
      <div class="container">
        <div
          v-if="conditionSearch == '' || typeof conditionSearch == 'undefined'"
        >
          <div class="columns">
            <div class="column is-2"></div>
            <div class="column is-8">
              <figure class="image is-350x150">
                <img src="../assets/promotion2.jpg" />
              </figure>
            </div>
            <div class="column is-2"></div>
          </div>
          <p class="is-size-3 mt-5 mb-2">หน้าแรก</p>
          <div class="columns frame-book mt-2 box">
            <div class="content">
              <div class="columns is-multiline mt-1">
                <div
                  class="column is-2"
                  v-for="book in books"
                  :key="book._id"
                >
                  <div class="card">
                    <div class="card-image pt-5">
                      <figure class="image">
                        <img
                          style="height: 150px"
                          :src="imagePath(book.image_source)"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div class="card-content">
                      <div>
                        <h6>{{ book.book_name }}</h6>
                      </div>
                      <br />
                      <div>
                        <p>
                          {{
                            book.book_count > 0
                              ? book.book_price + " ฿"
                              : "สินค้าหมด"
                          }}
                        </p>
                      </div>
                    </div>
                    <footer class="card-footer">
                      <router-link
                        class="card-footer-item"
                        :to="{
                          name: 'bookDeatail',
                          params: { bookId: book._id },
                        }"
                        >ดู</router-link
                      >
                      <a
                        v-show="book.book_count > 0 && user.type == 'customer'"
                        class="card-footer-item"
                        @click="addToCart(book.book_id)"
                      >
                        <span class="icon">
                          <i class="fas fa-shopping-cart"></i>
                        </span>
                      </a>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns mt-3">
            <div class="column is-2"></div>
            <div class="column is-8">
              <figure class="image is-350x150">
                <img src="../assets/promotion2.jpg" />
              </figure>
            </div>
            <div class="column is-2"></div>
          </div>
        </div>

        <!-- Result search-->
        <div v-else>
          <div class="columns mt-5">
            <!-- Filter-->
            <div class="column is-3 mt-6">
              <div
                class="columns has-background-primary has-text-white has-text-centered mx-2"
              >
                <div class="column"><p>หมวดหมู่สินค้า</p></div>
              </div>
              <div>
                <div v-for="bookcate in cateArr" :key="bookcate.name">
                  <div class="columns mt-3">
                    <div class="column mx-2">
                      <input type="checkbox" v-model="bookcate.status" />
                      {{ bookcate.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- result Search -->
            <div class="column is-9 p-5 box">
              <div class="columns mt-2">
                <div class="column is-2">
                  <label class="label">ผลลัพธ์สินค้า</label>
                </div>
                <div class="column is-6"></div>
                <div class="column is-4">
                  <div class="control has-icons-left">
                    <div class="select is-primary">
                      <select v-model="type">
                        <option value="alphabetAsc">
                          เรียงตามตัวอักษร น้อย-มาก
                        </option>
                        <option value="alphabetDsc">
                          เรียงตามตัวอักษร มาก-น้อย
                        </option>
                        <option value="price">ราคา</option>
                      </select>
                    </div>
                    <span class="icon is-left">
                    <i class="fas fa-filter"></i>
                    </span>
                  </div>
                </div>
              </div>
              <hr />
              <div class="columns is-multiline" v-if="this.books.length > 0">
                <div
                  class="column is-3"
                  v-for="book in filterCete"
                  :key="book.book_id"
                >
                  <div class="card">
                    <div class="card-image pt-5">
                      <figure class="image">
                        <img
                          style="height: 200px"
                          :src="imagePath(book.image_source)"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div class="card-content">
                      <div>
                        <h6>{{ book.book_name }}</h6>
                      </div>
                      <br />
                      <div>
                        <!-- book.book_count > 0
                              ? book.book_price + " ฿"
                              : "สินค้าหมด" -->
                        <span v-if="book.book_count > 0">
                          <span v-if="book.book_price > book.discount_price && !(book.discount_price == null)">
                          <p style='text-decoration: line-through'>
                          
                             {{
                            book.book_price
                          }} ฿
                          
                          </p>
                          </span>
                           <span v-if="book.discount_price == null">
                          <p>
                          
                             {{
                            book.book_price
                          }} ฿
                          
                          </p>
                          </span>
                          <p v-if="book.book_price > book.discount_price && !(book.discount_price == null)">{{book.discount_price}} ฿</p>
                         
                        
                        </span>
                        <span v-else>
                          <p>
                            สินค้าหมด
                          </p>
                          
                        </span>
                      </div>
                    </div>
                    <footer class="card-footer">
                      <router-link
                        class="card-footer-item"
                        :to="{
                          name: 'bookDeatail',
                          params: { bookId: book.book_id },
                        }"
                        >ดู</router-link
                      >
                      <a
                        v-show="book.book_count > 0 && user.type == 'customer'"
                        class="card-footer-item"
                        @click="addToCart(book.book_id)"
                      >
                        <span class="icon">
                          <i class="fas fa-shopping-cart"></i>
                        </span>
                      </a>
                    </footer>
                  </div>
                </div>
              </div>
              <div v-else class="has-text-centered">
                <p class="is-size-3">ไม่พบผลลัพธ์</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import axios from "@/plugins/axios";
// import { Swiper, SwiperSlide } from 'swiper/vue';

//   // Import Swiper styles
//   import 'swiper/swiper.scss';
// import "swiper/components/scrollbar/scrollbar.scss";

// // install Swiper modules
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// @ is an alias to /src
export default {
  post: {
    id: 1,
    title: "My Journey with Vue",
  },
  props: ["user"],
  name: "Home",
  data() {
    return {
      search: "",
      books: [],
      conditionSearch: "",
      arry: [],
      type: "alphabetAsc",
      cateArr: [],
      sort: false,
    };
  },
  // components: {
  //   Swiper,
  //   SwiperSlide,
  // },

  mounted() {
    this.getBooks(this.$route.query.search, this.$route.query.type);
  },
  methods: {
    getBooks(key, type) {
      this.conditionSearch = key;
      axios
        .get("/getallbook", {
          params: {
            search: key,
            type: type,
          },
        })
        // .get("http://localhost:8080/getAllAccount")
        .then((response) => {
          this.books = response.data
          console.log(response.data[0].book_name);
          console.log(this.books);
          this.checkExisting();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchBooks() {
      console.log("search");
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
    checkExisting() {
      this.books.forEach((book) => {
        if (!this.arry.includes(book.book_category)) {
          this.cateArr.push({
            name: book.book_category,
            status: false,
          });

          this.arry.push(book.book_category);
        }
      });
    },
    addToCart(bookId) {
      if (!this.user)
        alert('You are a guess user. Please login to use this function.')
      else {
        console.log(this.user.account_id);
        console.log(bookId);

        axios
          .post(`https://immense-mesa-76111.herokuapp.com/account/cart/${this.user.account_id}`, { book_id: bookId })
          .then((response) => {
            console.log(response)
            alert("เพิ่มสินค้าใส่ตระกร้าเรียบร้อย");
            // this.$router.push({ name: 'cart', params: {id: id}});
          })
          .catch((error) => {
            alert("จำนวนของสินค้าไม่สามารถเพิ่มได้อีก");
            console.log(error);
          });
      }
    },
    sortAlphbetASC(a, b){
      
      if(a.book_name > b.book_name){
        return 1
      }
      else{
        return -1
      }
    },
    sortAlphbetDESC(a, b){
     
      if(a.book_name > b.book_name){
        return -1
      }
      else{
        return 1
      }
    },
    sortPrice(a, b){
    
      if(a.book_price > b.book_price){
        return 1
      }
      else if (a.book_price == b.book_price){
        return 0
      }
      else{
        return -1
      }
    }
  },
  computed: {
    filterCete() {
      let arryCompare = [];
      let fil = this.cateArr.filter((val) => {
        return val.status === true;
      });
      fil.forEach((val) => {
        arryCompare.push(val.name);
      });
      console.log(arryCompare);
      let result = this.books.filter((val) => {
        console.log(arryCompare.includes(val.book_category));
        return arryCompare.includes(val.book_category);
      });
      if (result.length === 0 && arryCompare !== 0) {
        result = this.books;
      }
      if(this.type === 'alphabetAsc'){
        result.sort(this.sortAlphbetASC)
      }
      if(this.type === 'alphabetDsc'){
        result.sort(this.sortAlphbetDESC)
      }
      if(this.type === 'price'){
        result.sort(this.sortPrice)
      }
      console.log(result);
      return result;
    },
  },
};
</script>
