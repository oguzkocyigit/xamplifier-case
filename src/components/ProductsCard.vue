<template>
  <div class="products-card-view">
    <b-row>
      <b-col v-for="product in displayedProducts" :key="product.id">
        <ProductsCardItem :product="product"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ProductsCardItem from './ProductsCardItem.vue';

export default {
  name: "ProductsCard",
  components: { ProductsCardItem },
  props: {
    displayedProducts: Array,
  },
  data() {
    return {};
  },
};
</script>
