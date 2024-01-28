<template>
  <section class="container">
    <div class="row">
      <div class="col-sm-4">
        <img class="img-thumbnail" :src="productItem.urlImage" alt="" />
        <div class="card-shop" v-if="isLogin">
          <b-avatar variant="info"></b-avatar>
          <div class="card-info">
            <div class="card-info-top">
              <strong>{{ productItem.shopInfo.name }}</strong>
              <b-icon stacked icon="check-circle" font-scale="1" class="card-info-icon"></b-icon>
            </div>
            <p class="card-info-bottom" @click="handleFollowShop" v-if="productItem.isFollow">Bỏ theo dõi</p>
            <p class="card-info-bottom" @click="handleFollowShop" v-else>Theo dõi</p>
          </div>
        </div>
      </div>
      <div class="col-sm-8">
        <div class="alert alert-success">
          <b>Name : </b>
          <span> {{ productItem.name }} </span>
        </div>
        <div class="alert alert-success">
          <b>Mô tả : </b>
          <span> {{ productItem.description }} </span>
        </div>
        <div class="alert alert-success">
          <b>Giá Bán : </b>
          <span> {{ productItem.sellingPrice }} VNĐ </span>
        </div>
        <div class="alert alert-success">
          <b>SỐ lượng tồn kho : </b>
          <span> {{ productItem.quantity }} </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import apiService from "@/axios";

export default {
  props: {
    productId: {
      type: String,
    },
  },
  data() {
    return {
      isLogin: false,
      productItem: {
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        image: "https://via.placeholder.com/150",
        shopName: "",
        shopId: "",
        infoShop: {
          name: ""
        },
      },
    };
  },
  methods: {
    getProductDetail() {
      apiService
        .get(`/product-service/${this.productId}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.code === 200)
            this.productItem = res.data.metaData;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleFollowShop() {
      apiService
        .post(`/shop-service/follow`, { shopId: this.productItem.shopId }, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          }
        })
        .then((res) => {
          if (res.data.code === 200) {
            this.$bvToast.toast(`${res.data.message}`, {
              title: 'Thông báo',
              variant: 'success',
              autoHideDelay: 5000,
            })
            this.productItem.isFollow = !this.productItem.isFollow;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  created() {
    this.getProductDetail();
    if (localStorage.getItem("token")) {
      this.isLogin = true;
    }
  },
};
</script>

<style>
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

.card-info-bottom:hover {
  background-color: rgb(239, 98, 47);
  color: white;
}
</style>
