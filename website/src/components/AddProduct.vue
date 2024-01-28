<template>
    <b-modal id="modal-add-product" size="lg" :title="titleForm" @ok="addProduct" cancel-title="Huỷ">
        <b-form-group label="Tên sản phẩm:" label-for="productName">
            <b-form-input v-model="product.name" id="productName" placeholder="Nhập tên sản phẩm"></b-form-input>
        </b-form-group>

        <b-form-group label="Giá nhập:" label-for="buyingPrice">
            <b-form-input v-model="product.buyingPrice" id="buyingPrice" type="number"
                placeholder="Giá nhập"></b-form-input>
        </b-form-group>

        <b-form-group label="Giá bán:" label-for="sellingPrice">
            <b-form-input v-model="product.sellingPrice" id="sellingPrice" type="number"
                placeholder="Giá bán"></b-form-input>
        </b-form-group>

        <b-form-group label="Số lượng:" label-for="quantity">
            <b-form-input v-model="product.quantity" id="quantity" type="number"
                placeholder="Số lượng sản phẩm"></b-form-input>
        </b-form-group>

        <b-form-group label="Hình ảnh sản phẩm:" label-for="urlImage">
            <b-form-input v-model="product.urlImage" id="urlImage" placeholder="URL hình ảnh sản phẩm"></b-form-input>
        </b-form-group>

        <b-form-group label="Mô tả:" label-for="productDescription">
            <b-form-textarea v-model="product.description" id="productDescription"
                placeholder="Mô tả sản phẩm"></b-form-textarea>
        </b-form-group>
    </b-modal>
</template>
  
<script>
import apiService from '@/axios';
import numeral from 'numeral';

export default {
    props: {
        productId: {
            type: String,
        },
    },

    data() {
        return {
            titleForm: '',
            product: {
                name: '',
                description: '',
                buyingPrice: 0,
                sellingPrice: 0,
                quantity: 0,
                urlImage: '',
                shopId: JSON.parse(localStorage.getItem('shopId')),
            },
        };
    },

    methods: {
        addProduct() {
            apiService.post('/product-service/', this.product, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            }).then((res) => {
                this.$emit('addProductSuccess', "Thêm sản phẩm thành công!");
                this.$bvModal.hide('modal-add-product');
                this.$router.push({ name: 'manage-product' });
            }).catch((err) => {
                console.log(err);
            });
        }
    },

    created() {
        if (this.productId) {
            this.titleForm = 'Cập nhật sản phẩm';
        } else {
            this.titleForm = 'Thêm sản phẩm';
        }
    },

    computed: {
        formattedBuyingPrice() {
            return numeral(this.product.sellingPrice).format('0,0');
        },
        formattedSellingPrice() {
            return numeral(this.product.sellingPrice).format('0,0');
        }
    },
};
</script>
  