<template>
  <div class="products-card-view">
    <b-card
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="product-card mb-2"
    >
      <template #header>
        <span class="product-price">{{ product.price }} €</span>
      </template>
      <img :src="product.image" alt="Product Image" style="max-width: 100px; max-height: 100px;"/>
      <p class="mt-3">{{ product.name }}</p>
      <p>{{ product.category }}</p>
      <template #footer>
        <b-button v-b-toggle.sidebar-right variant="success" @click="addToCart(product)">
          Add to Cart
          <b-icon class="ms-3" icon="cart4" aria-hidden="true"></b-icon>
        </b-button>
      </template>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ProductsCardItem",
  props: {
    product: Object,
  },
  data() {
    return {
      isCheckoutSidebarVisible: false
    };
  },
  methods: {
    addToCart(data) {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = cartItems.findIndex((item) => item.id === data.id);

      if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity++;
      } else {
        cartItems.push({
          id: data.id,
          image: data.image,
          category: data.category,
          name: data.name,
          price: data.price,
          quantity: 1,
        });
      }
      this.$store.dispatch("addToCart", data);
    }
  },
};
</script>
