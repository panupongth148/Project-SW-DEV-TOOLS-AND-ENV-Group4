<template>
  <div class="container is-widescreen" id="app">
    <div class="columns mt-6">
      <div class="column is-6 has-text-centered">
        <img
          src="../../assets/login.png"
          style="width: 300px; heigh: 300px"
        /><br /><br />
        <label class="label">เข้าสู่ระบบ</label>
      </div>
      <div class="column is-6 box p-6">
        <p
          v-if="error"
          class="px-3 py-2 mb-3 has-text-danger-dark has-background-danger-light"
        >
          {{ error }}
        </p>
        <div class="field mb-5">
          <label class="label has-text-centered">เข้าสู่ระบบ</label>
        </div>
        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="username"
              class="input is-success"
              type="text"
              placeholder="Input your username"
              data-test="username"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="password"
              class="input is-success"
              type="password"
              placeholder="Input your password"
              data-test="password"
            />
          </div>
        </div>
        <br />
        <div class="control has-text-centered">
          <button class="button is-link" data-test="submitLogin" @click="submit()">Submit</button>
        </div>
        <p class="my-3">
          Don't have an account yet?
          <router-link to="/account/register">Sign up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "", // owenlnwza
      password: "", // 123456aA
      isError: false,
      error: ''
    };
  },
  methods: {
    submit() {
      console.log("Log in");
      const data = {
        username: this.username,
        password: this.password,
      };
      axios
        .post("https://immense-mesa-76111.herokuapp.com/account/login/", data)
        .then((res) => {
          const token = res.data.token;
          localStorage.setItem("token", token);
          console.log("success");
          this.$emit("auth-change");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          this.error = error.response.data.substring(6);

          console.log(error.response.data);
        });
    },
  },
};
</script>