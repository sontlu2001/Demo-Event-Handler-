<template>
    <a-form ref="loginForm" :form="form" @finish="handleLogin">
        <a-form-item label="Username" name="username" rules="[{ required: true, message: 'Please input your username' }]">
            <a-input v-model:value="form.username" />
        </a-form-item>
        <a-form-item label="Password" name="password" rules="[{ required: true, message: 'Please input your password' }]">
            <a-input type="password" v-model:value="form.password" />
        </a-form-item>
        <a-form-item>
            <a-button type="primary" @click="submitForm">Đăng nhập</a-button>
        </a-form-item>
    </a-form>
</template>
  
<script>
import { ref } from 'vue';
import { Form, Input, Button } from 'ant-design-vue';

export default {
    components: {
        'a-form': Form,
        'a-form-item': Form.Item,
        'a-input': Input,
        'a-button': Button,
    },
    setup() {
        const form = ref(null);
        const handleLogin = () => {
            form.value.validate((valid) => {
                if (valid) {
                    // Xử lý logic đăng nhập ở đây
                    console.log('Đăng nhập thành công');
                } else {
                    console.log('Vui lòng điền thông tin đăng nhập');
                }
            });
        };

        const submitForm = () => {
            console.log('submitForm', form);
            // form.value.submit();
        };

        return {
            form,
            handleLogin,
            submitForm,
        };
    },
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
        };
    },
};
</script>
  
<style></style>
  