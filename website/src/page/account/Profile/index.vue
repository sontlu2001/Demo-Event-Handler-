<template>
  <div>
    <a-card>
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="Name">
          <a-input
            v-model="form.name"
            style="font-weight: 600; color: #000000"
            disabled />
        </a-form-item>
        <a-form-item label="Balance">
          <a-input
            v-model="form.balance"
            style="font-weight: 600; color: #000000"
            disabled />
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import PaymentService from "@/service/PaymentService";

export default {
  data() {
    return {
      data: undefined,
      form: {
        name: undefined,
        balance: undefined,
      },
    };
  },
  mounted() {
    document.addEventListener("noti", (e) => {
      this.$message.info(e.detail.message);
      this.getAccount();
    });
  },
  created() {
    this.getAccount();
  },
  methods: {
    getAccount() {
      PaymentService.getDetail(2)
        .then((res) => {
          console.log(res.data);
          this.form = res.data;
          this.form.balance = res.data.data.balance.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          });
        })
        .catch((reason) => {
          console.log(reason.response);
        });
    },
  },
};
</script>
