<template>
  <div id="app" class="container">
    <b-card title="Đăng Nhập" class="mt-5 text-center" style="max-width: 400px; margin: auto">
      <img src="@/assets/logo-shop2.png" alt="Logo" class="mb-3" style="width: 100px; height: 100px" />

      <b-form @submit.prevent="handleLogin">
        <b-form-group label="Email người dùng" label-for="email" class="text-left" :state="emailState">
          <b-form-input id="email" v-model="email" required placeholder="Nhập email người dùng"
            @input="validateemail"></b-form-input>
          <!-- Hiển thị thông báo lỗi nếu có -->
          <b-form-invalid-feedback :state="emailState">
            Email người dùng không được trống.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="text-left" label="Mật khẩu" label-for="password" :state="passwordState">
          <b-form-input id="password" type="password" v-model="password" required placeholder="Nhập password"
            @input="validatepassword" />
          <!-- Hiển thị thông báo lỗi nếu có -->
          <b-form-invalid-feedback :state="passwordState">
            password không được trống.
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" variant="primary" class="text-left mt-3">Đăng Nhập</b-button>
        <b-button @click="goToRegister" variant="link" class="mt-2">Chưa có tài khoản? Đăng ký ngay</b-button>
      </b-form>
    </b-card>

    <b-toast id="login-fail-toast" v-model="isLoginFail" title="Đăng nhập thất bại" auto-hide-delay="3000"
      variant="danger" append-to-body>
      <p>{{ toastMessage }}</p>
    </b-toast>
  </div>
</template>

<script>
import apiService from '@/axios';

export default {
  data() {
    return {
      email: "",
      password: "",
      emailState: null,
      passwordState: null,
      toastMessage: "",
      isLoginFail: false,
    };
  },
  methods: {
    handleLogin() {
      if (this.validateemail() && this.validatepassword()) {
        apiService
          .post("/user-service/login", {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            if (res.data.code === 200) {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userName", res.data.metaData.name);
              this.$router.push("/");
            } else {
              console.log('run');
              this.isLoginFail = true;
              this.toastMessage = res.data.message;
            }
          })
          .catch((err) => {
            this.isLoginFail = true;
            this.toastMessage = "Vui lòng kiểm tra lại thông tin đăng nhập!";
            console.log(err);
          });
      }
    },
    validateemail() {
      this.emailState = this.email.trim() !== "" ? true : false;
      return this.emailState;
    },
    validatepassword() {
      this.passwordState = this.password.trim() !== "" ? true : false;
      return this.passwordState;
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style></style>
