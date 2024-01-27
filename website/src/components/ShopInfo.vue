<template>
  <div class="shop-component">
    <div class="card">
      <img
        :src="shop.image"
        class="card-img-top rounded-circle"
        alt="Shop Image" />

      <div class="card-body">
        <h5 class="card-title">{{ shop.name }}</h5>

        <!-- <p class="card-text">Số lượng sản phẩm: {{ shop.productCount }}</p>

        <p class="card-text">Người theo dõi: {{ shop.followersCount }}</p> -->

        <button @click="toggleFollow" class="btn btn-primary">
          {{ shop.isFollowed ? "Bỏ theo dõi" : "Theo dõi" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      required: true,
      default: () => ({
        name: "Shop Name",
        image: "https://via.placeholder.com/150",
        productCount: 0,
        followersCount: 0,
        isFollowed: false,
      }),
    },
  },
  methods: {
    toggleFollow() {
      // Thực hiện chức năng toggle theo dõi ở đây
      this.shop.isFollowed = !this.shop.isFollowed;
    },
  },
};
</script>

<style scoped>
/* Thêm các tùy chỉnh CSS của bạn tại đây nếu cần */
</style>
