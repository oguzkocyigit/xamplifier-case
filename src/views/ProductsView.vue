<template>
  <div class="home">
    <b-container class="mt-5 mb-5">
      <div v-if="!loading" class="product-list">
        <b-row class="align-items-center">
          <b-col>
            <h3 class="float-start">Products List</h3>
          </b-col>
        </b-row>
        <ProductsCard :displayedProducts="displayedProducts" />
        <b-row class="justify-content-center d-grid mt-3">
          <b-pagination v-model="currentPage" :total-rows="products.length" :per-page="itemsPerPage" />
        </b-row>
      </div>
      <b-spinner class="loading-spinner" v-else></b-spinner>
    </b-container>
    <CheckoutDrawer/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ProductsCard from '../components/ProductsCard.vue';
import CheckoutDrawer from '../components/CheckoutDrawer.vue';

export default {
  name: "ProductsView",
  components: {
    ProductsCard,
    CheckoutDrawer
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      loading: false,
      isCheckoutSidebarVisible: false,
    };
  },
  computed: {
    products () {
      return this.$store.getters.getProducts
    },
    displayedProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.products.slice(startIndex, endIndex);
    },
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    ...mapActions(['fetchProducts']),
  },
  watch: {
    '$store.state.loading': function() {
      this.loading = this.$store.state.loading
    }
  }
};
</script>
