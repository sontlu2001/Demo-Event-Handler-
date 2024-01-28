<template>
    <section class="bg-light" style="height: 100vh;">
        <h2 class="text-center text-success font-weight-bold mb-3 pt-3">Quản lý sản phẩm</h2>
        <div class="p-4">
            <b-button class="mb-3" variant="primary" @click="addProduct">Thêm sản phẩm</b-button>
            <div class="d-flex justify-content-end">
            </div>

            <b-table :items="products" :fields="fields" hover bordered outlined small>
                <!-- add css product name -->
                <template v-slot:cell(name)="data">
                    <div class="name-cell">
                        {{ data.item.name }}
                    </div>
                </template>
                <!-- add css product description -->
                <template v-slot:cell(description)="data">
                    <div class="description-cell">
                        {{ data.item.description }}
                    </div>
                </template>
                <template v-slot:cell(actions)="data">
                    <div>
                        <b-icon @click="editProduct(data.item)" style="cursor: pointer;" class="mr-4" icon="pencil-fill"
                            variant="success"></b-icon>
                        <b-icon @click="deleteProduct(data.index)" style="cursor: pointer;" icon="trash"
                            variant="danger"></b-icon>
                    </div>
                </template>
            </b-table>
        </div>
    </section>
</template>
  
<script>
import axios from "axios";

export default {
    data() {
        return {
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
            console.log(shopId);
            axios.get(`http://localhost:7000/product-service/getProductsByShop/${shopId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
                .then((response) => {
                    this.products = response.data.metaData
                })
        },
    },

    created() {
        this.getListProduct();
    },
}
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
  