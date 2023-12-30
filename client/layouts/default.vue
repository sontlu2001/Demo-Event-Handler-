<template>
    <div>
        <!-- Header -->
        <Header />

        <!-- Nội dung chính của trang web -->
        <nuxt />

        <!-- Footer -->
        <Footer />
    </div>
</template>
  
<script>
import Header from '~/components/Header.vue'; // Đường dẫn đến component Header
import Footer from '~/components/Footer.vue'; // Đường dẫn đến component Footer

export default {
    components: {
        Header,
        Footer,
    },
};
</script>
  