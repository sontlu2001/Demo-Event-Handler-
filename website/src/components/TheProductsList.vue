<template>
  <div>
    <section class="product-list">
      <h2 class="product-list__title text-center text-success font-weight-bold">
        Các Sản Phẩm Nổi Bật
      </h2>
      <div class="cart-container">
        <product-item v-for="productItem in productList" :key="productItem.id" :productItem="productItem"
          :handleAddCart="handleAddCart"></product-item>
      </div>
    </section>
  </div>
</template>

<script>
import ProductItem from "./ProductItem.vue";
export default {
  props: {
    productList: {
      type: Array,
    },
    handleAddCart: {
      type: Function,
    },
  },
  components: { ProductItem },
};
</script>

<style lang="css" scoped>
.cart-container {
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
}
</style>
