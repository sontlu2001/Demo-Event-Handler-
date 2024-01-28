<template>
  <section>
    <header>
      <the-header :cartList="cartList" :sumAmountCart="sumAmountCart" :handleUpOrDownAmount="handleUpOrDownAmount"
        :notificationList="notificationList" :unseenCount="unseenCount" :handleRemoveCart="handleRemoveCart" />
    </header>

    <main class="container mt-3">
      <the-productsList :productList="productList" :handleAddCart="handleAddCart"></the-productsList>
    </main>
  </section>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheProductsList from "@/components/TheProductsList.vue";
import apiService from '@/axios';

export default {
  name: "App",

  components: {
    TheHeader,
    TheProductsList,
  },

  data() {
    return {
      productList: [],
      cartList: [],
      notificationList: [],
      unseenCount: 0,
    };
  },

  computed: {
    sumAmountCart() {
      return this.cartList.reduce(
        (sum, cartItem) => (sum += cartItem.amount),
        0
      );
    },
  },

  methods: {
    handleAddCart(cart) {
      const index = this.cartList.findIndex(
        (product) => product.id === cart.id
      );
      console.log(index);
      if (index !== -1) {
        // tăng số lượng
        this.cartList[index].amount += 1;
      } else {
        // thêm sản phẩm mới vào cart list
        const newCart = { ...cart, amount: 1 };
        this.cartList.push(newCart);
      }
    },

    handleUpOrDownAmount(cart, isUp) {
      const index = this.cartList.findIndex(
        (product) => product.id === cart.id
      );
      if (index !== -1) {
        if (isUp) {
          if (
            this.cartList[index].amount < this.cartList[index].quantityInStock
          ) {
            this.cartList[index].amount += 1;
          } else {
            alert("Vượt Quá Số Lượng Cho Phép!");
          }
        } else {
          if (this.cartList[index].amount > 1) {
            this.cartList[index].amount -= 1;
          } else {
            alert("Vượt Quá Số Lượng Cho Phép!");
          }
        }
      }
    },

    handleRemoveCart(cart) {
      this.cartList = this.cartList.filter(
        (cartItem) => cartItem.id !== cart.id
      );
    },

    getProductList() {
      apiService
        .get("/product-service/getAllProducts")
        .then((response) => {
          if (response.data.code === 200) {
            this.productList = response.data.metaData.map(item => {
              return {
                _id: item._id,
                name: item.name,
                image: item.urlImage,
                price: item.sellingPrice,
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });

    },

    getNotification() {
      apiService.get('/notification-service/getAllNotifications', {
        headers: { Authorization: `${localStorage.getItem('token')}` }
      })
        .then((response) => {
          if (response.data.code === 200) {
            this.notificationList = response.data.metaData;
            this.unseenCount = response.data.unseenCount;
            console.log(this.notificationList, this.unseenCount);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },

  created() {
    this.getProductList();
    this.getNotification();
  },
};
</script>

<style></style>
