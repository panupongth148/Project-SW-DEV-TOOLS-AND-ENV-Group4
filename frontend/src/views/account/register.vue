<template>
  <div class="container is-widescreen" id="app">
    <div class="columns mt-6">
      <div class="column is-6 has-text-centered">
        <img
          src="../../assets/kidsRegister.png"
          style="width: 400px; heigh: 400px"
        /><br /><br />
        <label class="label">สมัครสมาชิก</label>
      </div>
      <div class="column is-6 box p-6">
        <div class="field mb-5">
          <label class="label has-text-centered">สมัครสมาชิก</label>
        </div>
        <div class="field">
          <label class="label">ชื่อ</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="$v.first_name.$model"
              :class="{ 'is-danger': $v.first_name.$error }"
              class="input"
              type="text"
              placeholder="กรอกชื่อ"
            />
          </div>
          <template v-if="$v.first_name.$error">
            <p class="help is-danger" v-if="!$v.first_name.required">
              โปรดใส่ ชื่อ
            </p>
            <p class="help is-danger" v-if="!$v.first_name.maxLength">
              คุณกำลังใส่ ชื่อที่ไม่มีอยู่จริง
            </p>
            <p class="help is-danger" v-if="!$v.first_name.alpha">
              ชือไม่มีตัวเลขนะพี่บ่าว
            </p>
            </template
          >
        </div>
        <div class="field">
          <label class="label">นามสกุล</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="$v.last_name.$model"
              :class="{ 'is-danger': $v.last_name.$error }"
              class="input"
              type="text"
              placeholder="กรอกนามสกุล"
            />
          </div>
          <template v-if="$v.last_name.$error">
            <p class="help is-danger" v-if="!$v.last_name.required">
              โปรดใส่ นามสกุล
            </p>
            <p class="help is-danger" v-if="!$v.last_name.maxLength">
              คุณกำลังใส่นามสกุลที่ไม่มีอยู่จริง
            </p>
            <p class="help is-danger" v-if="!$v.last_name.alpha">
              นามสกุลไม่มีตัวเลขนะพี่บ่าว
            </p>
            </template>
        </div>
        <div class="field">
          <label class="label">ชื่อบัญชีผู้ใช้</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="$v.username.$model"
              :class="{ 'is-danger': $v.username.$error }"
              class="input"
              type="text"
              placeholder="กรอกชื่อบัญชีผู้ใช้"
            />
          </div>
          <template v-if="$v.username.$error">
            <p class="help is-danger" v-if="!$v.username.required">
              โปรดใส่ Username
            </p>
            <p class="help is-danger" v-if="!$v.username.minLength">
              โปรดใส่ชื่อบัญชีผู้ใช้ 5 ตัวอักษรขึ้นไป
            </p>
            <p class="help is-danger" v-if="!$v.username.maxLength">
              โปรดใส่ชื่อบัญชีผู้ใช้ไม่เกิน 20 ตัวอักษร
            </p>
          </template>
        </div>
        <div class="field">
          <label class="label">รหัสผ่าน</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="$v.password.$model"
              :class="{ 'is-danger': $v.password.$error }"
              class="input"
              type="password"
              placeholder="กรอกรหัสผ่าน"
            />
          </div>
          <template v-if="$v.password.$error">
              <p class="help is-danger" v-if="!$v.password.required">
                โปรดใส่รหัสผ่าน
              </p>
              <p class="help is-danger" v-if="!$v.password.minLength">
                โปรดใส่รหัสผ่านมากกว่า 8 ตัว
              </p>
              <p class="help is-danger" v-if="!$v.password.complex">
                รหัสผ่านของคุณง่ายไป
              </p>
            </template>
        </div>
        <div class="field">
          <label class="label">ยืนยันรหัสผ่าน</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="$v.confirm_password.$model"
              :class="{ 'is-danger': $v.confirm_password.$error }"
              class="input"
              type="password"
              placeholder="กรอกรหัสผ่านอีกครั้ง"
            />
          </div>
          <template v-if="$v.confirm_password.$error">
              <p class="help is-danger" v-if="!$v.confirm_password.sameAs">
                รหัสผ่านไม่ตรงกัน
              </p>
            </template>
        </div>
        <div class="field">
          <label class="label">อีเมล</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="$v.email.$model"
              :class="{ 'is-danger': $v.email.$error }"
              class="input"
              type="email"
              placeholder="กรอกอีเมล"
            />
          </div>
          <template v-if="$v.email.$error">
              <p class="help is-danger" v-if="!$v.email.required">
                โปรดใส่อีเมลล์
              </p>
              <p class="help is-danger" v-if="!$v.email.email">ผิดรูปแบบอีเมล์</p>
            </template>
        </div>
        <div class="field">
          <label class="label">โทรศัพท์</label>
          <div class="control has-icons-left has-icons-right">
            <input
              v-model="$v.phone_number.$model"
              :class="{ 'is-danger': $v.phone_number.$error }"
              class="input"
              type="mobile"
              placeholder="กรอกเบอร์โทรศัพท์"
            />
          </div>
           <template v-if="$v.phone_number.$error">
              <p class="help is-danger" v-if="!$v.phone_number.required">
                โปรดใส่เบอรืโทรศัพท์
              </p>
              <p class="help is-danger" v-if="!$v.phone_number.mobile">
                ผิดรูปแบบเบอร์โทรศัพท์
              </p>
            </template>
        </div>
        <div class="field">
          <div class="control">
            <label class="label">เลือกประเภทบัญชี</label>
            <label class="radio">
              <input
                v-model="$v.acc_type.$model"
                type="radio"
                name="acc_type"
                value="customer"
              />
              Customer
            </label>
            <label class="radio">
              <input
                v-model="$v.acc_type.$model"
                type="radio"
                name="acc_type"
                value="seller"
              />
              Seller
            </label>
          </div>
          <template v-if="$v.acc_type.$error">
              <p class="help is-danger" v-if="!$v.acc_type.required">
                โปรดเลือกชนิดบัญชีใช้งาน
              </p></template>
          <div class="control mt-2">
            <label class="label">รูปโปรไฟล์</label>
            <input
              class="mb-5"
              multiple
              type="file"
              accept="image/png, image/jpeg, image/webp"
              @change="selectImages"
            />
          </div>
        </div>
        <hr />
        <div class="field my-4">
          <div class="control">
            <label class="checkbox">
              <input v-model="agreement" type="checkbox" />
              ฉันยอมรับ<a href="#">ข้อตกลงในการเป็นสมาชิก</a>
            </label>
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button
              :class="{ 'is-static': !agreement }"
              class="button is-primary is-fullwidth"
              @click="submit()"
            >
              สมัครสมาชิก
            </button>
          </div>
          <div class="control">
            <button class="button is-link is-light">ยกเลิก</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  alpha,
} from "vuelidate/lib/validators";

// Check format Phone_number
function phoneNumber(value) {
  return !!value.match(/0[0-9]{9}/);
}

// Check format Password
function complexPassword(value) {
  if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
    return false;
  }
  return true;
}

export default {
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      email: "",
      phone_number: "",
      first_name: "",
      last_name: "",
      acc_type: "",
      agreement: false,
      images: [],
    };
  },
  validations: {
    email: {
      required: required,
      email: email,
      
    },
    phone_number: {
      required: required,
      phone_num: phoneNumber,
      minLength: minLength(10),
      maxLength: maxLength(10),
    },
    password: {
      required: required,
      minLength: minLength(8),
      complex: complexPassword,
    },
    confirm_password: {
      required: required,
      sameAs: sameAs("password"),
    },
    username: {
      required: required,
      minLength: minLength(5),
      maxLength: maxLength(20),
    },
    first_name: {
      required: required,
      maxLength: maxLength(150),
      alpha: alpha,
    },
    last_name: {
      required: required,
      maxLength: maxLength(150),
      alpha: alpha,
    },
    acc_type: {
      required: required,
    },
  },
  methods: {
    selectImages(event) {
      this.images = event.target.files;
    },
    submit() {
      // Validate all fields
      this.$v.$touch();
      console.log(this.$v.$invalid);

      // เช็คว่าในฟอร์มไม่มี error
      if (!this.$v.$invalid) {
        let formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);
        formData.append("confirm_password", this.confirm_password);
        formData.append("email", this.email);
        formData.append("phone_number", this.phone_number);
        formData.append("first_name", this.first_name);
        formData.append("last_name", this.last_name);
        formData.append("acc_type", this.acc_type);
        this.images.forEach((image) => {
          formData.append("myImage", image);
        });

        axios
          .post("https://immense-mesa-76111.herokuapp.com/account/register", formData)
          .then((res) => {
            alert("Register Success");
            this.$router.push({ path: "/account/login" });
          })
          .catch((err) => {
            console.log(err);
            alert(err.response.data);
          });
      }
    },
  },
};
</script>