<template>
  <div>
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <!-- Navbar content -->

      <a class="navbar-brand header__logo" href="#">EasyCart</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Sản phẩm</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              Danh mục
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Thiết bị điện tử</a>
              <a class="dropdown-item" href="#">Điện thoại & phụ kiện</a>
              <a class="dropdown-item" href="#">Thời trang nam</a>
              <a class="dropdown-item" href="#">Thời trang nữ</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>

        <div class="header-card ml-1 mr-2">
          <b-button type="button" class="btn btn-danger" v-b-modal.model-cart-list>
            <i class="fa fa-shopping-cart"></i>
            <span class="badge badge-light ml-2">{{ sumAmountCart }}</span>
          </b-button>
          <b-modal id="model-cart-list" size="xl" cancel-title="Huỷ" ok-title="Thanh toán">
            <cart-list :cartList="cartList" :handleUpOrDownAmount="handleUpOrDownAmount"
              :handleRemoveCart="handleRemoveCart" />
          </b-modal>
        </div>

        <div v-if="isLogin" class="header-bir p-2" style="position: relative">
          <div type="button" class="p-2 bg-dark" id="popover-badge">
            <i class="fa fa-bell text-light" style="font-size: 20px"></i>
            <span v-if="unseenCount > 0" class="header-badge badge badge-danger rounded">{{ unseenCount }}</span>
          </div>

          <b-popover target="popover-badge" triggers="click" placement="bottom">
            <b-list-group style="width: 240px">

              <b-list-group-item v-for="(item, index) in notificationList" :key="index"
                class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                  <strong class="mb-1">Thông báo</strong>
                  <small>{{ calculateTimeAgo(item.created_at) }}</small>
                </div>
                <p class="mb-1">{{ item.message }}</p>
              </b-list-group-item>

            </b-list-group>
          </b-popover>
        </div>

        <div class="header-profile ml-4">
          <b-avatar variant="info" v-if="isLogin" id="popover-profile">{{ userName }}</b-avatar>
          <b-popover target="popover-profile" triggers="hover" placement="bottom">
            <b-list-group class="p-0">
              <b-list-group-item @click="this.$router.push('/user/profile')" @mouseover="highlightItem"
                @mouseout="unhighlightItem">
                Xem thông tin
              </b-list-group-item>
              <b-list-group-item v-if="isShop" @click="goToManagerProduct" @mouseover="highlightItem"
                @mouseout="unhighlightItem">Quản lý sản phẩm</b-list-group-item>
              <b-list-group-item v-if="isLogin" @click="goToHome" @mouseover="highlightItem"
                @mouseout="unhighlightItem">Đăng xuất</b-list-group-item>
            </b-list-group>
          </b-popover>
          <b-button v-if="!isLogin" variant="outline-light" @click="goToLogin">Đăng nhập</b-button>
        </div>
      </div>

    </nav>
  </div>
</template>

<script>
import CartList from "./CartList.vue";
import apiService from '@/axios';
import moment from 'moment';

export default {
  components: { CartList },
  props: {
    cartList: {
      type: Array,
    },
    sumAmountCart: {
      type: Number,
    },
    handleUpOrDownAmount: {
      type: Function,
    },
    handleRemoveCart: {
      type: Function,
    },
    notificationList: {
      type: Array,
    },
    unseenCount: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      isOpenModal: false,
      isLogin: false,
      isShop: false,
      isPopoverVisible: true,
      userName: localStorage.getItem("userName") || '',
    };
  },

  methods: {
    handleOpenModal() {
      this.isOpenModal = true;
    },
    handleCloseModal() {
      this.isOpenModal = false;
    },

    goToLogin() {
      this.$router.push({ name: "login" });
      localStorage.removeItem("token");
      localStorage.removeItem("shopId");
    },

    goToHome() {
      window.location.href = "/";
      localStorage.removeItem("token");
      localStorage.removeItem("shopId");
    },

    goToManagerProduct() {
      this.$router.push({ name: "manage-product" });
    },

    highlightItem(e) {
      e.target.classList.add("active");
    },

    unhighlightItem(e) {
      e.target.classList.remove("active");
    },

    calculateTimeAgo(createdAt) {
      const timeAgo = moment(createdAt).fromNow();
      return timeAgo;
    }
  },

  created() {
    console.log(this.notificationList);
    this.isLogin = localStorage.getItem("token") ? true : false;
    if (this.isLogin) {
      apiService
        .get('/shop-service/detail', {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.code === 200) {
            localStorage.setItem("shopId", JSON.stringify(res.data.metaData._id));
            this.isShop = true;
          } else {
            this.isShop = false;
          }
        })
    }
  },
};
</script>

<style scoped>
.header__logo {
  font-size: 30px;
  background: -webkit-linear-gradient(#41b883, #35495e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-badge {
  position: absolute;
  top: 7px;
  right: 5px;
  border-radius: 50% !important;
}

.list-group-item {
  border: none !important;
}

.popover-body {
  padding: unset !important;
}
</style>
