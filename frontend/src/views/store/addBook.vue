<template>
  <section id="app">
    <div class="container is-wildscreen my-5">
      <div class="header my-3"><p class="is-size-2">เพิ่มหนังสือ</p></div>
      <div class="columns mt-5">
        <div class="column is-12">
          <label class="label is-size-5">ชื่อหนังสือ</label>
          <input
            class="input mt-1"
            v-model="$v.nameBook.$model"
            data-test="bookName"
            data-testid="bookName"
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
            data-test="bookDescription"
            data-testid="bookDescription"
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
            <select v-model="$v.bookType.$model" data-test="bookType" data-testid="bookType">
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
          <input class="input mt-1" v-model="$v.bookCategory.$model" data-test="bookCategory" data-testid="bookCategory" :class="{ 'is-danger': $v.bookCategory.$error }"/>
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
      <div class="columns my-2">
        <div class="column is-6">
          <label class="label is-size-5">ราคาหนังสือ</label>
          <!-- <input class="input mt-1" v-model="bookDescription"> -->
          <input class="input mt-1" v-model="$v.bookPrice.$model" data-test="bookPrice" data-testid="bookPrice" :class="{ 'is-danger': $v.bookPrice.$error }"/>
        </div>
        <div class="column is-6">
          <label class="label is-size-5">จำนวน</label>
          <!-- <input class="input mt-1" v-model="bookDescription"> -->
          <input class="input mt-1" v-model="$v.bookCount.$model" data-test="bookCount" data-testid="bookCount" :class="{ 'is-danger': $v.bookCount.$error }"/>
        </div>
      </div>
      <div class="columns my-2">
        <div class="column is-6">
          <template v-if="$v.bookPrice.$error" >
        <p class="help is-danger" v-if="!$v.bookPrice.required">
          โปรดใส่ราคา
        </p>
        <p class="help is-danger" v-if="!$v.bookPrice.numeric">
          โปรดใส่เป็นตัวเลข
        </p>
      </template>
        </div>
        <div class="column is-6">
           <template v-if="$v.bookCount.$error" >
        <p class="help is-danger" v-if="!$v.bookCount.required">
          โปรดใส่จำนวน
        </p>
        <p class="help is-danger" v-if="!$v.bookCount.numeric">
          โปรดใส่เป็นตัวเลข
        </p>
      </template>
        </div>
      </div>
       
      <div class="columns">
        <div class="column is-2"></div>
        <div class="column is-8">
          <UploadImages
            @change="handleImages"
            fileError="เห็นนะไม่ไฟล์รูปนะ"
            :max="5"
            maxError="ไฟล์เกิน 5 ไฟล์"
            uploadMsg="โปรด อัพไฟล์รูปภาพ"
            data-test="bookPicture"
            data-testid="bookPicture"
          />
        </div>
        <div class="column is-2"></div>
      </div>
      <div class="columns">
        <div class="column is-1 is-offset-10">
          <button class="button is-primary is-medium" data-test="submitAddBook" data-testid="submitAddBook" @click="submit()">
            ยืนยัน
          </button>
        </div>
        <div class="column is-1">
          <button class="button is-light is-medium" @click="submit()">
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "@/plugins/axios";
import UploadImages from "vue-upload-drop-images";

import {
  required,
  
  minLength,
  maxLength,
 
  numeric,
} from "vuelidate/lib/validators";
// @ is an alias to /src
export default {
  name: "Home",
  props: ["user"],
  data() {
    return {
      search: "",
      books: [],
      nameBook: "",
      bookDescription: "",
      bookCategory: "",
      bookPrice: "",
      bookCount: 1,
      bookType: "",
      imageBook: "",
      
      storeId: 0,
      countArrayImage: 0,
    };
  },
  components: {
    UploadImages,
  },

  mounted() {
    this.storeId = this.$route.params.storeId;
  },
  methods: {
    handleImages(files) {
      console.log(files.length)
      this.imageBook = files
    },
    submit() {
      this.$v.$touch();

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid && !this.checkpic) {
        let formData = new FormData();
        formData.append("book_name", this.nameBook);
        formData.append("book_description", this.bookDescription);
        formData.append("book_type", this.bookType);
        formData.append("book_category", this.bookCategory);
        formData.append("book_count", this.bookCount);
        formData.append("book_price", this.bookPrice);
        formData.append("store_id", this.storeId);
        formData.append("book_discount", 0);

        this.imageBook.forEach((image) => {
          formData.append("myImage", image);
        });

        axios
          .post(`https://immense-mesa-76111.herokuapp.com/addbook/${this.storeId}`, formData)
          .then((res) => {
            alert("ลงทะเบียนสำเร็จ");
            this.$router.push({ path: `/store/managebook/${this.storeId}` });
          })
          .catch((err) => {
            alert(err.response.data.details.message);
          });
      } else {
        alert("โปรดดูว่าใส่ข้อมูลถูกต้องหรือไม่")
      }
    },

    imagePath(file_path) {
      if (file_path) {
        return "https://immense-mesa-76111.herokuapp.com/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    }
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
      maxLength:maxLength(45)
    },
    bookPrice: {
      required,
      numeric: numeric,
    },
    bookCount: {
      required,
      numeric: numeric,
    },
  },
  computed : {
    checkpic(){
      return this.imageBook.length > 5
    }
  }
};
</script>