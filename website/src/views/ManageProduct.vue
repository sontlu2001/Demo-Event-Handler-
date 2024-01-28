<template>
    <section class="bg-light" style="height: 100vh;">
        <h2 class="text-center text-success font-weight-bold mb-3 pt-3">Quản lý sản phẩm</h2>
        <div class="p-4">
            <b-button v-b-modal.modal-add-product class="mb-3" variant="primary">Thêm sản
                phẩm</b-button>
            <add-product @addProductSuccess="handleAddProductSuccess" />

            <b-table :items="products" :fields="fields" hover bordered outlined small>
                <!-- add css product name -->

                <template v-slot:cell(name)="data">
                    <div class="name-cell">
                        {{ data.item.name }}
                    </div>
                </template>

                <template v-slot:cell(description)="data">
                    <div class="description-cell">
                        {{ data.item.description }}
                    </div>
                </template>

                <template v-slot:cell(buyingPrice)="data">
                    <div>
                        {{ formattedPrice(data.item.buyingPrice) }}
                    </div>
                </template>

                <template v-slot:cell(sellingPrice)="data">
                    <div>
                        {{ formattedPrice(data.item.sellingPrice) }}
                    </div>
                </template>

                <template v-slot:cell(actions)="data">
                    <div>
                        <b-icon @click="editProduct(data.item)" style="cursor: pointer;" class="mr-4" icon="pencil-fill"
                            variant="success"></b-icon>
                        <b-icon @click="openModelDeleteById(data.item._id)" v-b-modal.modelDelete style="cursor: pointer;"
                            icon="trash" variant="danger"></b-icon>
                        <b-modal @ok="deleteProduct(data.item._id)" :id='data.item._id' title="Xoá sản phẩm">
                            <p>Bạn có chắc chắn muốn xoá sản phẩm này?</p>
                        </b-modal>
                    </div>
                </template>

            </b-table>
        </div>

        <b-toast id="login-fail-toast" v-model="isShowToast" title="Thông báo" auto-hide-delay="3000" :variant="typeMessage"
            append-to-body>
            <p>{{ toastMessage }}</p>
        </b-toast>
    </section>
</template>
  
<script>
import AddProduct from "@/components/AddProduct.vue";
import apiService from '@/axios';
import numeral from 'numeral';

export default {
    components: { AddProduct },
    data() {
        return {
            toastMessage: "",
            modelDelete: "",
            isShowToast: false,
            typeMessage: "success",
            products: [],
            fields: [
                { key: 'name', label: 'Tên sản phẩm', sortable: true },
                { key: 'description', label: 'Mô tả', sortable: true },
                { key: 'quantity', label: 'Số lượng', sortable: true },
                { key: 'buyingPrice', label: 'Giá mua', sortable: true },
                { key: 'sellingPrice', label: 'Giá bán', sortable: true },
                { key: 'actions', label: 'Actions' },
            ],
        };
    },

    methods: {
        getListProduct() {
            const shopId = JSON.parse(localStorage.getItem("shopId"));
            apiService.get(`/product-service/getProductsByShop/${shopId}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                }
            })
                .then((response) => {
                    this.products = response.data.metaData
                })
        },

        handleAddProductSuccess(message) {
            this.toastMessage = message;
            this.isShowToast = true;
            this.typeMessage = "success";
            this.getListProduct();
        },

        deleteProduct(productId) {
            apiService.delete(`/product-service/${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
                .then((response) => {
                    if (response.data.code === 200) {
                        this.toastMessage = "Xoá sản phẩm thành công!";
                        this.isShowToast = true;
                        this.typeMessage = "success";
                        this.getListProduct();
                    }
                })
                .catch((error) => {
                    this.toastMessage = "Xoá sản phẩm thất bại!";
                    this.isShowToast = true;
                    this.typeMessage = "danger";
                })
        },

        openModelDeleteById(idModel) {
            this.modelDelete = idModel;
            this.$bvModal.show(this.modelDelete);
        },

        formattedPrice(price) {
            return numeral(price).format('0,0');
        },
    },

    created() {
        this.getListProduct();
    },
};
</script>
  
<style>
.name-cell {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.description-cell {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
  