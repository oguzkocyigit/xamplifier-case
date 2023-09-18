<template>
  <div id="login">
    <b-container class="mt-5 mb-5">
      <b-col class="mt-5 mb-3" cols="6" offset="3">
        <img class="logo w-100" src="../assets/images/xamplifier-logo.png" alt="">
      </b-col>
      <b-form @submit.prevent="login">
        <b-col cols="6" offset="3">
          <b-form-group
              id="username-group"
              label="Username"
              label-for="username"
          >
            <b-form-input
                id="username"
                v-model="username"
                required
                placeholder="Enter your username"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col class="mt-3" cols="6" offset="3">
          <b-form-group
              id="password-group"
              label="Password"
              label-for="password"
          >
            <b-form-input
                id="password"
                v-model="password"
                required
                type="password"
                placeholder="Enter your password"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col class="mt-3" cols="6" offset="3">
          <b-button class="w-100" type="submit" variant="primary">Login</b-button>
        </b-col>

      </b-form>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const username = this.username;
      const password = this.password;

      try {
        const response = await axios.post('https://fakestoreapi.com/auth/login', {
          username: username,
          password: password,
        });

        if (response.status === 200) {
          const token = response.data;
          this.$store.commit('setLogin', token);
          await this.$router.push({name: 'ProductList'});
        } else {
          console.error('Authentication failed:', response.data);
        }
      } catch (error) {
        // Handle network error or other exceptions
        console.error('Error during login:', error);
      }
    },
  },
};
</script>
