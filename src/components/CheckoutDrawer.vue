<template>
  <b-sidebar
      class="checkout-sidebar"
      id="sidebar-right"
      title="Checkout"
      right
      shadow
      backdrop
  >
    <div v-if="cartItems.length" class="px-3 py-2">
      <b-table
          striped
          hover
          :items="cartItems"
          :fields="fields"
      >
        <template #cell(image)="row">
          <img :src="row.item.image" alt="" style="max-width: 30px;" />
        </template>
        <template #cell(price)="row">
          {{ row.item.price }} €
        </template>
        <template #cell(quantity)="row">
          <button @click="decrementQuantity(row.item)">-</button>
          <input v-model="row.item.quantity" @change="changeQuantity(row.item)">
          <button @click="incrementQuantity(row.item)">+</button>
        </template>
        <template #cell(total)="row">
          {{ (row.item.price * row.item.quantity).toFixed(2) }} €
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger">
            <b-icon @click="deleteFromCart(row.item)" icon="x" aria-hidden="true"></b-icon>
          </b-button>
        </template>
      </b-table>
      <p class="w-100 me-3" style="text-align: right">
        Total Items: <span class="fw-bold">{{ totalItems }}</span>
      </p>
      <p class="w-100 me-3" style="text-align: right">
        Checkout Price: <span class="fw-bold">{{ total.toFixed(2) }} €</span>
      </p>
      <router-link :to="{ path: '/cart' }" style="text-align: right" class="w-100 cart-icon me-3">
        <span class="float-end fw-bold">Go to checkout</span>
      </router-link>
    </div>
    <p class="mt-5" v-else>There are no products</p>
  </b-sidebar>
</template>

<script>

export default {
  name: "CheckoutDrawer",
  data() {
    return {
      fields: [
        { key: "image", label: "" },
        { key: "price", label: "" },
        { key: "quantity", label: "" },
        { key: "total", label: "" },
        { key: "actions", label: "" },
      ],
    };
  },
  computed: {
    cartItems () {
      return this.$store.getters.getCart
    },
    totalItems () {
      return this.$store.getters.getTotalItems
    },
    total() {
      return this.cartItems.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    },
  },
  methods: {
    removeFromCartLocal(productId) {
      const index = this.cartItems.findIndex((item) => item.id === productId);
      if (index !== -1) {
        const item = this.cartItems[index];
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          this.cartItems.splice(index, 1);
        }
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
      }
    },

    deleteFromCartLocal(productId) {
      const index = this.cartItems.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
      }
    },

    changeQuantity(product) {
      const newQuantity = parseInt(product.quantity, 10);

      if (!isNaN(newQuantity) && newQuantity >= 0) {
        product.quantity = newQuantity;

        if (newQuantity === 0) {
          this.removeFromCartLocal(product.id);
        } else {
          localStorage.setItem("cart", JSON.stringify(this.cartItems));
        }
      } else {
        product.quantity = 1;
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
      }
    },

    incrementQuantity(product) {
      if (product.quantity >= 1) {
        const existingProduct = this.cartItems.find((item) => item.id === product.id);
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          product.quantity = 1;
          this.cartItems.push(product);
        }
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
      } else {
        this.removeFromCartLocal(product.id);
      }
    },

    decrementQuantity(product) {
      this.removeFromCartLocal(product.id);
    },

    deleteFromCart(product) {
      this.deleteFromCartLocal(product.id);
    },
  },
};
</script>
