<template>
  <nav>
    <b-container>
      <b-row class="align-items-center">
        <b-col>
          <router-link :to="{path: '/'}">
            <img class="logo" src="../assets/images/xamplifier-logo.png" alt="">
          </router-link>
        </b-col>
        <b-col>
          <router-link :to="{path: '/cart'}" class="cart-icon">
            <div class="cart-quantity">
              <b-icon class="float-end" icon="cart4" aria-hidden="true"></b-icon>
              <span>{{ totalItems }}</span>
            </div>
            <span>Checkout</span>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </nav>
</template>

<script>

export default {
  name: 'NavBar',
  computed: {
    totalItems () {
      return this.$store.getters.getTotalItems
    },
  },
};
</script>
