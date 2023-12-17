<template>
  <div>
    <a-card>
      <div>
        <a-form @submit="handleSearch" class="product__search-form">
          <a-form-item>
            <a-input-search v-model="params.name" placeholder="Search by name">
              <a-icon type="search" />
            </a-input-search>
          </a-form-item>
          <a-form-item>
            <a-select
              placeholder="Search by category"
              v-model="params.categoryId"
            >
              <a-select-option
                v-for="item in categories"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select placeholder="Min price" v-model="params.maxPrice">
              <a-select-option :value="10000"> 10.000 </a-select-option>
              <a-select-option :value="20000"> 20.000 </a-select-option>
              <a-select-option :value="30000"> 30.000 </a-select-option>
              <a-select-option :value="40000"> 40.000 </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select placeholder="Max price" v-model="params.minPrice">
              <a-select-option :value="100000"> 100.000 </a-select-option>
              <a-select-option :value="200000"> 200.000 </a-select-option>
              <a-select-option :value="300000"> 300.000 </a-select-option>
              <a-select-option :value="400000"> 400.000 </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
        <a-button type="primary" html-type="submit" @click="handleSearch">
          Search
        </a-button>
        <a-button
          type="primary"
          html-type="submit"
          @click="resetButton"
          style="margin-left: 20px"
        >
          Reset
        </a-button>
      </div>
      <div style="padding-bottom: 20px; padding-top: 20px">
        <router-link to="/products/create">
          <a-button type="primary" icon="plus"> Add product </a-button>
        </router-link>
      </div>
      <a-table
        :columns="columns"
        :pagination="false"
        rowKey="id"
        :data-source="data"
      >
        <span slot="category" slot-scope="text">
          <p>{{ text.name }}</p>
        </span>
        <span slot="thumbnail" slot-scope="text">
          <img :src="text" style="width: 100%" />
        </span>
        <div slot="action" slot-scope="text, record">
          <a class="button" @click="showDeleteConfirm(record.id)">
            <a-icon type="delete" />
          </a>
          |
          <a class="button" :href="'/products/edit/' + record.id">
            <a-icon type="edit" />
          </a>
          |
          <a class="button" :href="'/products/detail/' + record.id">
            <a-icon type="info-circle" />
          </a>
          |
          <a
            class="button"
            @click="
              addToCart(record.id, record.name, record.thumbnail, record.price)
            "
          >
            <a-icon type="shopping-cart" />
          </a>
        </div>
      </a-table>
      <div style="padding-top: 15px">
        <a-pagination
          :default-current="this.params.pageSize"
          :total="this.totalRecords"
          show-size-changer
          @showSizeChange="onShowSizeChange"
          @change="onChange"
        />
      </div>
    </a-card>
  </div>
</template>
<script>
import ProductService from "@/service/ProductService";
import CategoryService from "@/service/CategoryService";
import CartService from "@/service/CartService";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Image",
    dataIndex: "thumbnail",
    key: "thumbnail",
    ellipsis: true,
    scopedSlots: { customRender: "thumbnail" },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "In stock",
    dataIndex: "inStock",
    key: "inStock",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    ellipsis: true,
    scopedSlots: { customRender: "category" },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    ellipsis: true,
    scopedSlots: { customRender: "action" },
  },
];

export default {
  data() {
    return {
      data: [],
      form: {
        productId: undefined,
        productName: undefined,
        thumbnail: undefined,
        unitPrice: undefined,
        quantity: 1,
      },
      columns,
      /*body:{
        productId: undefined,
        productName:undefined,
        thumbnail:undefined,
        unitPrice:undefined,
        quantity:1
      },*/
      totalRecords: undefined,
      categories: [],
      params: {
        pageSize: 5,
        page: 1,
        name: undefined,
        categoryId: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sortType: undefined,
      },
    };
  },
  created() {
    this.getProducts();
    this.getCategorise();
  },
  methods: {
    getProducts() {
      ProductService.getAll(this.params).then((rs) => {
        console.log(rs.data.data);
        this.data = rs.data.data.content;
        this.totalRecords = rs.data.pagination.totalItems;
      });
    },
    getCategorise() {
      CategoryService.getAll().then((res) => {
        console.log(res.data.data);
        this.categories = res.data.data;
      });
    },
    onShowSizeChange(current, pageSize) {
      this.params.pageSize = pageSize;
      this.params.page = current;
      this.getProducts();
    },
    onChange(page, limit) {
      this.params.page = page;
      this.params.pageSize = limit;
      this.getProducts();
    },
    showDeleteConfirm(pId) {
      this.$confirm({
        title: "Do you want delete this product",
        onOk: () => {
          this.deleteProduct(pId);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    deleteProduct(pId) {
      ProductService.delete(pId);
      this.getProducts();
    },
    handleSearch(e) {
      e.preventDefault();
      this.params.page = 1;
      this.getProducts();
    },
    resetButton() {
      this.params = {
        categoryId: undefined,
        maxPrice: undefined,
        minPrice: undefined,
        name: undefined,
        page: undefined,
      };
    },
    addToCart(id, name, thumbnail, unitPrice) {
      console.log(id, name, thumbnail, unitPrice);
      this.form.productId = id;
      this.form.productName = name;
      this.form.thumbnail = thumbnail;
      this.form.unitPrice = unitPrice;
      CartService.addToCart(this.form).then((response) => {
        console.log(response);
        this.$message.success("add to cart success");
      });
    },
  },
};
</script>
<style scoped>
.product__search-form {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
</style>
