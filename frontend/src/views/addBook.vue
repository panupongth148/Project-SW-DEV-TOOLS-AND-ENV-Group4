<template>
  <section id="app">
    <div class="container is-wildscreen my-5">
      <div class="header my-3"><p class="is-size-2">เพิ่มหนังสือ</p></div>
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
          <input class="input mt-1" v-model="bookCategory" />
        </div>
      </div>
      <div class="columns my-2">
        <div class="column is-6">
          <label class="label is-size-5">ราคาหนังสือ</label>
          <input class="input mt-1" v-model="bookPrice" />
        </div>
        <div class="column is-6">
          <label class="label is-size-5">จำนวน</label>
          <input class="input mt-1" v-model="bookCount" />
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
          />
        </div>
        <div class="column is-2"></div>
      </div>
      <div class="columns">
        <div class="column is-1 is-offset-10">
          <button class="button is-primary is-medium" @click="submit()">
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
import UploadImages from "vue-upload-drop-images";

export default {
  name: "Home",
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
      
      storeId: 1,
      countArrayImage: 0,
    };
  },
  components: {
    UploadImages,
  },

  mounted() {
    
  },
  methods: {
    
  },
};
</script>