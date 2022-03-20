<template>
  <div id="app">
    <!-- Nav bar -->
    <div class="columns nav-bar">
      <div class="column is-1"></div>
      <div class="column is-1 ml-6">
        <div class="field">
          <figure class="image is-64x64 pl-3">
            <router-link to="/">
              <img src="./assets/logo1.png"/>
            </router-link>
          </figure>
          <h3>Book2Hand</h3>
        </div>
      </div>
      <div class="column is-5 is-offset-1 mt-4">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input
              class="input mt-2"
              type="text"
              placeholder=""
              v-model="search"
            />
          </p>
          <router-link
            :to="{ path: '/', query: { search: `${this.search}` } }"
          >
            <p class="control mt-2">
              <a class="button"> ค้นหา </a>
            </p>
          </router-link>
        </div>
      </div>
      <div v-if="user" class="column is-4 is-offset-1">
        <div class="columns mt-4">
          <div class="column is-4 mt-2 navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <figure class="image is-24x24 m-auto">
                <img class="is-rounded" :src="imagePath(user.image)" />
              </figure>
              <span class="pl-3"
                >{{ user.first_name }} {{ user.last_name }}</span
              >
            </a>
            <div class="navbar-dropdown">
              <router-link
                :to="{ name: 'user', params: { id: this.user.account_id } }"
              >
                <a class="navbar-item">Profile</a>
              </router-link>
              <router-link
                v-if="user.type === 'customer'"
                :to="{
                  name: 'myOrders',
                  params: { id: this.user.account_id },
                }"
              >
                <a class="navbar-item">My order</a>
              </router-link>
              <a class="navbar-item" @click="logout()">Log out</a>
            </div>
          </div>
          <div class="column is-1 mt-1">
            <router-link
              :to="{ name: 'cart', params: { id: this.user.account_id } }"
              v-if="user.type === 'customer'"
            >
              <p class="control ml-3">
                <a><i class="fas fa-shopping-cart"></i></a>
              </p>
            </router-link>
            <router-link
              :to="{
                name: 'manageStore',
                params: { storeId: this.store.store_id },
              }"
              v-if="user.type === 'seller'"
            >
              <p class="control ml-3">
                <a class="button" data-test="store">หน้าร้านค้า</a>
              </p>
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="!user" class="column is-2 is-offset-1 mt-4">
        <div class="field has-addons mt-4" v-if="!user">
          <router-link to="/account/register">
            <p class="control ml-3 has-text-black-bis">
              <a>สมัครสมาชิก</a>
            </p>
          </router-link>
          <router-link to="/account/login" data-test="login">
            <p class="control ml-3 has-text-black-bis">
              <a>เข้าสู่ระบบ</a>
            </p>
          </router-link>
          <router-link>
            <p class="control ml-3">
              <a><i class="fas fa-shopping-cart"></i></a>
            </p>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Banner-->

    <div class="container">
      <div class="columns">
        <div class="column">
          <nav
            class="navbar"
            role="navigation"
            aria-label="main navigation"
            style="z-index: 1"
          >
            <a
              role="button"
              class="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

            <div id="navbarBasicExample" class="navbar-menu">
              <div class="navbar-item">
                <router-link :to="{ path: '/' }">
                  <a class="navbar-link"> หน้าแรก </a>
                </router-link>
              </div>
              <div class="navbar-item">
                <router-link
                  :to="{ path: '/', query: { search: 'type', type: 'book' } }"
                >
                  <a class="navbar-link">หนังสือ</a>
                </router-link>
              </div>
              <div class="navbar-item">
                <router-link
                  :to="{
                    path: '/',
                    query: { search: 'type', type: 'magazine' },
                  }"
                >
                  <a class="navbar-link">นิตยสาร</a>
                </router-link>
              </div>
              <div class="navbar-item">
                <router-link :to="{ path: '/', query: { search: 'discount' } }">
                  <a class="navbar-link">ลดราคา</a>
                </router-link>
              </div>
              <a class="navbar-item"> ติดต่อ </a>
            </div>
          </nav>
        </div>
      </div>
    </div>

    <router-view
      :key="$route.fullPath"
      @auth-change="onAuthChange"
      :user="user"
    />

    <footer class="footer has-background-primary footer-css mt-6">
      <div class="content has-text-centered">
        <p>
          <strong>เว็บไซต์นี้ทำเพื่อการศึกษา</strong>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

// @ is an alias to /src
export default {
  name: "Home",
  data() {
    return {
      search: "",
      blogs: [],
      user: null,
      dropdownPro: false,
      type: "",
      store: "",
    };
  },

  async mounted () {
    await this.onAuthChange();
    await this.getBlogs();
    
  },
  methods: {
    async getBlogs() {
      console.log("this.getstore");
    },
    async getStore(){
      console.log("get store")
      await axios.get(`/store/${this.user.account_id}`).then((response) =>{
        this.store = response.data.storeData
        console.log("in get store")
        console.log(this.store);
      }).catch((err) =>{
        console.log(err)
      })
    },
    imagePath(file_path) {
      if (file_path) {
        console.log(file_path);
        return "https://immense-mesa-76111.herokuapp.com/" + file_path;
      } else {
        return "https://bulma.io/images/placeholders/640x360.png";
      }
    },
    onAuthChange() {
      const token = localStorage.getItem("token");
      console.log(token)
      if (token) {
        this.getUser();
      }
    },
    async getUser() {
      console.log("getUser")
      await axios.get("/user/me").then((res) => {
        this.user = res.data;
        console.log(this.user)
      }).then((val) => {
        if(this.user.type != 'customer'){
            this.getStore()
          }
      });
    },
    logout() {
      localStorage.clear();
      this.user = null;
      this.$router.push({ path: "/" });
    },
    inputType(type) {
      this.type = type;
    },
  },
};
</script>

