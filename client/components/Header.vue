<template>
    <div class="header">
        <a-menu mode="horizontal" :default-selected-keys="['home']">
            <a-menu-item key="home">Trang chủ</a-menu-item>
            <a-menu-item key="products">Sản phẩm</a-menu-item>
            <a-menu-item key="contact">Liên hệ</a-menu-item>
            <a-menu-item v-if="!loggedIn" style="float: right;">
                <a-button @click="showModal = true">Đăng nhập</a-button>
            </a-menu-item>
            <a-menu-item v-if="loggedIn" style="float: right;">
                <a-dropdown>
                    <a-button>{{ username }}</a-button>
                    <a-menu slot="overlay" @click="handleLogout">
                        <a-menu-item key="logout">Đăng xuất</a-menu-item>
                    </a-menu>
                </a-dropdown>
            </a-menu-item>
        </a-menu>

        <a-modal title="Đăng nhập" v-model:visible="showModal" :footer="null">
            <login />
        </a-modal>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import Login from './Login.vue';

export default {
    components: {
        'login': Login,
    },
    data() {
        return {
            loggedIn: false,
            username: '', // Để hiển thị tên người dùng sau khi đăng nhập
            showModal: false,
            // Các thông tin đăng nhập (tạm thời sử dụng để minh họa)
            loginInfo: {
                username: 'user',
                password: 'password',
            },
        };
    },
    methods: {
        handleLogin() {
            // Thực hiện logic đăng nhập của bạn ở đây
            // Tạm thời sử dụng thông tin đăng nhập cứng để minh họa
            if (this.username === this.loginInfo.username) {
                this.loggedIn = true;
                this.showModal = false;
                message.success('Đăng nhập thành công');
            } else {
                message.error('Thông tin đăng nhập không chính xác');
            }
        },
        handleLogout() {
            // Thực hiện logic đăng xuất của bạn ở đây
            this.loggedIn = false;
            this.username = '';
            message.success('Đăng xuất thành công');
        },
        cancelLogin() {
            this.showModal = false;
        },
    },
};
</script>
  
<style>
/* Thêm CSS tùy chỉnh cho header nếu cần */
</style>
  