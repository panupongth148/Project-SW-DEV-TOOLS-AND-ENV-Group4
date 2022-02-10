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
      
      <div v-if="!user" class="column is-2 is-offset-1 mt-4">
        <div class="field has-addons mt-4" v-if="!user">
          <!-- <router-link to="/account/register"> -->
            <p class="control ml-3 has-text-black-bis">
              <a>สมัครสมาชิก</a>
            </p>
          <!-- </router-link>
          <router-link to="/account/login"> -->
            <p class="control ml-3 has-text-black-bis">
              <a>เข้าสู่ระบบ</a>
            </p>
          <!-- </router-link> -->
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

export default {
  name: 'App',
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
}
</script>
