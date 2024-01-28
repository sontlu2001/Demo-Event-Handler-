<template>
  <div class="card-item">
    <img class="card-img" :src="productItem.image" alt="Card image cap" />

    <div class="card-content">
      <div class="card-top">
        <h5 class="card-title">{{ productItem.name }}</h5>

        <div class="card-top-info">
          <div class="card-text text-danger">
            <h4 class="">{{ formatCurrency(productItem.price) }} VNĐ</h4>
          </div>
        </div>
      </div>

      <div class="card-bottom">
        <button class="btn btn-danger" @click="handleAddCart(productItem)">
          Thêm vào giỏ
        </button>
        <b-button v-b-model.modelProductDetail @click="openModelDetail(productItem._id)" class="btn btn-info ml-1">Chi
          Tiết</b-button>
        <b-modal :id="productItem._id" size="lg" title="Chi tiết sản phẩm">
          <detail-product :productId="productItem._id"></detail-product>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import DetailProduct from "@/components/DetailProduct.vue";
import AppModal from "@/components/AppModal.vue";
import numeral from 'numeral';

export default {
  components: {
    DetailProduct,
    AppModal,
  },
  props: {
    productItem: {
      type: Object,
    },
    handleAddCart: {
      type: Function,
    },
  },
  data() {
    return {
      isOpenModal: false,
      isLogin: false,
      productId: '',
      modelProductDetail: '',
    };
  },
  methods: {

    handleOpenModal() {
      this.isOpenModal = true;
    },

    handleCloseModal() {
      this.isOpenModal = false;
    },

    openModelDetail(productId) {
      console.log(productId);
      this.modelProductDetail = productId;
      this.$bvModal.show(this.modelProductDetail);
    },

    formatCurrency(amount) {
      return numeral(amount).format('0,0');
    }

  },
  created() {
    this.productId = this.productItem._id;
  },
};
</script>

<style lang="css">
.card-item {
  border-radius: 20px;
  overflow: hidden;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: calc(25% - 15px);
  margin-left: 15px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.card-img {
  height: 200px;
  width: 100%;
  object-fit: cover;
  flex-shrink: 0;
}

.card-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-top {
  display: flex;
  flex-direction: column;
  flex: 1;

}

.card-title {
  flex-shrink: 0;
}

.card-top-info {
  margin-top: auto;
}

.card-shop {
  display: flex;
  align-items: center;
  margin: 20px 0px;
}

.card-info {
  flex: 1;
  padding-left: 10px;
}

.card-info-top {
  display: flex;
  align-items: center;
  font-size: 15px;
}

.card-info-icon {
  margin-left: 5px;
  width: 15px;
  height: 15px;
  color: burlywood;
}

.card-info-bottom {
  color: chocolate;
  font-weight: 800;
  cursor: pointer;
  font-size: 12px;
  margin-bottom: 0px;
  border: 2px solid burlywood;
  display: inline-block;
  border-radius: 12px;
  padding: 4px;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}
</style>
