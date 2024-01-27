<template>
    <div id="app" class="container">
      <b-card title="Đăng Nhập" class="mt-5" style="max-width: 400px; margin: auto;">
        <!-- Thêm logo -->
        <img src="@/assets/logo.png" alt="Logo" class="mb-3" style="width: 100px; height: 100px;">
  
        <b-form @submit.prevent="handleLogin">
          <b-form-group
            label="Tên người dùng"
            label-for="username"
            description="Nhập tên người dùng của bạn"
          >
            <b-form-input
              id="username"
              v-model="username"
              required
              placeholder="Nhập tên người dùng"
            ></b-form-input>
          </b-form-group>
  
          <b-form-group
            label="Mật khẩu"
            label-for="password"
            description="Nhập mật khẩu của bạn"
          >
            <b-form-input
              id="password"
              type="password"
              v-model="password"
              required
              placeholder="Nhập mật khẩu"
            ></b-form-input>
          </b-form-group>
  
          <b-button type="submit" variant="primary" class="mt-3">Đăng Nhập</b-button>
  
          <!-- Thêm nút chuyển sang trang đăng ký -->
          <b-button @click="goToRegister" variant="link" class="mt-2">Chưa có tài khoản? Đăng ký ngay</b-button>
        </b-form>
      </b-card>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        // Xử lý logic đăng nhập ở đây
        console.log('Đăng nhập với tên người dùng:', this.username, 'và mật khẩu:', this.password);
        // Sau khi xử lý, bạn có thể chuyển hướng hoặc thực hiện các tác vụ khác
      },
      goToRegister() {
        // Chuyển hướng sang trang đăng ký
        this.$router.push('/register');
      }
    }
}