<template>
  <section id="app">
    <div class="container is-wildscreen my-5">
      <div class="header my-3"><p class="is-size-2">แก้ไขข้อมูลหนังสือ</p></div>
      <div class="columns mt-5">
        <div class="column is-12">
          <label class="label is-size-5">ชื่อหนังสือ</label>
          <input
            class="input mt-1"
            v-model="$v.nameBook.$model"
            :class="{ 'is-danger': $v.nameBook.$error }"
          />
        </div>
      </div>
      <template v-if="$v.nameBook.$error" class="my-1">
        <p class="help is-danger" v-if="!$v.nameBook.required">
          โปรดใส่ชื่อหนังสือ
        </p>
      </template>
      <div class="columns">
        <div class="column is-12">
          <label class="label is-size-5">รายละเอียดหนังสือ</label>
          <!-- <input class="input mt-1" v-model="bookDescription"> -->
          <textarea
            class="textarea"
            v-model="$v.bookDescription.$model"
            :class="{ 'is-danger': $v.bookDescription.$error }"
          ></textarea>
        </div>
      </div>
      <template v-if="$v.bookDescription.$error" class="my-1">
        <p class="help is-danger" v-if="!$v.bookDescription.required">
          โปรดใส่รายละเอียด
        </p>
        <p class="help is-danger" v-if="!$v.bookDescription.minLength">
          โปรดใส่รายละเอียดเกิน 15 อักษร
        </p>
      </template>
      <div class="columns">
        <div class="column is-12">
          <label class="label is-size-5">ชนิดหนังสือ</label>
          <!-- <input class="input mt-1" v-model="bookDescription"> -->
          <!-- <textarea class="textarea" v-model="bookDescription"></textarea> -->
          <div class="select" :class="{ 'is-danger': $v.bookType.$error }">
            <select v-model="$v.bookType.$model">
              <option value="book">หนังสือ</option>
              <option value="magazine">นิตยสาร</option>
            </select>
          </div>
        </div>
      </div>
      <template v-if="$v.bookType.$error" class="my-1">
        <p class="help is-danger" v-if="!$v.bookDescription.required">
          โปรดเลือกหัวข้อชนิดหนังสือ
        </p>
      </template>
      <div class="columns">
        <div class="column is-12">
          <label class="label is-size-5">หมวดหมู่หนังสือ</label>
          <!-- <input class="input mt-1" v-model="bookDescription"> -->
          <input
            class="input mt-1"
            v-model="$v.bookCategory.$model"
            :class="{ 'is-danger': $v.bookCategory.$error }"
          />
        </div>
      </div>
      <p class="help">โปรดใส่ชื่อหมวดตามจริงหากพบจะทำการลงโทษ</p>
      <template v-if="$v.bookCategory.$error" class="my-1">
        <p class="help is-danger" v-if="!$v.bookCategory.required">
          โปรดใส่หมวดหมู่หนังสือ
        </p>
        <p class="help is-danger" v-if="!$v.bookCategory.maxLength">
          ตัวอักษรเกิน 45 ตัวอักษร
        </p>
      </template>
      <div class="columns">
        <div class="column is-4">
          <label class="label is-size-5">ราคาหนังสือ</label>
          <!-- <input class="input mt-1" v-model="bookDescription"> -->
          <input class="input mt-1" v-model="$v.bookPrice.$model" :class="{ 'is-danger': $v.bookPrice.$error }"/>
        </div>
        <div class="column is-4">
          <label class="label is-size-5">จำนวน</label>
          <!-- <input class="input mt-1" v-model="bookDescription"> -->
         <input class="input mt-1" v-model="$v.bookCount.$model" :class="{ 'is-danger': $v.bookCount.$error }"/>
        </div>
        <div class="column is-4">
          <label class="label is-size-5">ราคาที่ลด</label>
          <!-- <input class="input mt-1" v-model="bookDescription"> -->
          <input class="input mt-1" v-model="$v.bookDiscount.$model" :class="{ 'is-danger': $v.bookDiscount.$error }"/>
        </div>
      </div>
      <div class="columns">
        <div class="column is-4">
          <template v-if="$v.bookPrice.$error" >
        <p class="help is-danger" v-if="!$v.bookPrice.required">
          โปรดใส่ราคา
        </p>
        <p class="help is-danger" v-if="!$v.bookPrice.numeric">
          โปรดใส่เป็นตัวเลข
        </p>
      </template>
        </div>
        <div class="column is-4">
         <template v-if="$v.bookCount.$error" >
        <p class="help is-danger" v-if="!$v.bookCount.required">
          โปรดใส่จำนวน
        </p>
        <p class="help is-danger" v-if="!$v.bookCount.numeric">
          โปรดใส่เป็นตัวเลข
        </p>
      </template>
        </div>
        <div class="column is-4">
         <template v-if="$v.bookDiscount.$error" >
        <p class="help is-danger" v-if="!$v.bookDiscount.numeric">
          โปรดใส่เป็นตัวเลข
        </p>
      </template>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          
          

          <h1 class="is-size-4">New Image</h1>
          <input
            class="mb-5"
            multiple
            type="file"
            accept="image/png, image/jpeg, image/webp"
            @change="selectImages"
          />

          
        </div>
      </div>
      <template v-if="checkpic">
        <p class="help is-danger is-size-4">
          รูปภาพเกิน 5 รูป
        </p>
      </template>
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

import {
  required,
  minLength,
  maxLength,
  numeric,
} from "vuelidate/lib/validators";

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
      store_id: '',
      selectMainId: null,
      books: '',
    };
  },
  components: {},

  mounted() {
    this.getImageForEdit(this.$route.params.bookId);
    this.getDataOfBook(this.$route.params.bookId);
    this.getStore()
  },
  methods: {
  
    selectImages(event) {
      //   console.log(URL.createObjectURL(event.target.files[0]));
      this.images = event.target.files;
    },
    getImageForEdit(id) {
      axios
        .get(`http://localhost:3000/book/detail/${id}/image`)
        .then((response) => {
          this.listImageBook = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    submit() {
      this.$v.$touch();
      console.log(this.$v.$invalid);

      // เช็คว่าในฟอร์มไม่มี error
      if ((!this.$v.$invalid) && !this.checkpic) {
      console.log("----");
      let formData = new FormData();
      formData.append("book_name", this.nameBook);
      formData.append("book_description", this.bookDescription);
      formData.append("book_type", this.bookType);
      formData.append("book_category", this.bookCategory);
      formData.append("book_count", this.bookCount);
      formData.append("book_price", this.bookPrice);
      formData.append("book_discount", this.bookDiscount);
      formData.append("store_id", this.books.store_id);

      this.images.forEach((image) => {
        console.log(image);
        formData.append("myImage", image);
      });

      axios
        .put(`http://localhost:3000/store/editbook/${this.bookId}`, formData)
        .then((res) => {
          alert("update complete");
          this.$router.push({
            path: `/store/managebook/${this.books.store_id}`,
          });
        })
        .catch((err) => {
          alert(err.response.data.details.message);
        });
      }else{
        alert('ตรวจสอบว่าอินพุดถูกต้อง')
      }
    },
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
          this.bookId = this.books.id;
          this.nameBook = this.books.book_name;
          this.bookDescription = this.books.book_description;
          this.bookCategory = this.books.book_category;
          this.bookCount = this.books.book_count;
          this.bookPrice = this.books.book_price;
          this.bookType = this.books.book_type;
          this.bookDiscount = this.books.book_discount;
          this.store_id = this.books.store_id
    },
    searchBooks() {
      console.log("search");
    },
    imagePath(file_path) {
      if (file_path) {
        return "http://localhost:3000/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    showSelectImage(image) {
      return URL.createObjectURL(image);
    },
    getStore(){
      axios.get(`/store/${this.user.account_id}`).then((response) => {
        this.store = response.data
      }).catch((err) =>{
        console.log(err)
      })
    },
  },
  validations: {
    nameBook: {
      required: required,
    },
    bookDescription: {
      required: required,
      min: minLength(15),
    },
    bookType: {
      required: required,
    },
    bookCategory: {
      required: required,
      maxLength: maxLength(45),
    },
    bookPrice: {
      required,
      numeric: numeric,
    },
    bookCount: {
      required,
      numeric: numeric,
    },
    bookDiscount: {
      numeric: numeric,
    },
  },
  computed : {
    checkpic(){
      
      return (this.images.length + this.listImageBook.length) > 5
    }
  }
};
</script>