<template>
  <div>
    <h2 class="product-list__title text-center text-success font-weight-bold">
      Các Sản Phẩm Nổi Bật
    </h2>
    <section class="product-list">
      <div class="row justify-content-around">
        <div v-for="productItem in productList" :key="productItem.id" class="col-lg-3 col-dm-4 col-sm-6 col-xs-12">
          <product-item :productItem="productItem" :handleAddCart="handleAddCart"></product-item>
        </div>
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

<style></style>
