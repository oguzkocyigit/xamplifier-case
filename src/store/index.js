import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import axios from 'axios';

export default new Vuex.Store({
    state: {
        products: [], // Stores the list of products
        cart: JSON.parse(localStorage.getItem('cart')) || [], // Stores the shopping cart items
        auth: JSON.parse(localStorage.getItem('auth')) || null, // Stores login information
        loading: false, // Indicates if data loading is in progress
    },
    mutations: {
        setCart(state, cart) {
            state.cart = cart;
            localStorage.setItem('cart', JSON.stringify(state.cart)); // Update localStorage with the cart data
        },
        removeCart(state, productId) {
            // Removes a product from the cart or decreases its quantity
            const index = state.cart.findIndex((item) => item.id === productId);
            if (index !== -1) {
                const item = state.cart[index];
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    state.cart.splice(index, 1); // Remove the product from the cart if quantity is 1
                }
                localStorage.setItem('cart', JSON.stringify(state.cart)); // Update localStorage with the modified cart
            }
        },
        deleteFromCart(state, productId) {
            // Deletes a product completely from the cart
            const index = state.cart.findIndex((item) => item.id === productId);
            if (index !== -1) {
                state.cart.splice(index, 1); // Remove the product from the cart
                localStorage.setItem('cart', JSON.stringify(state.cart)); // Update localStorage with the modified cart
            }
        },
        setLogin(state, token) {
            state.auth = token;
            // Store the token in local storage
            localStorage.setItem('auth', JSON.stringify(token));
        },
        setProducts(state, products) {
            // Sets the list of products in the state
            state.products = products;
        },
        setLoading(state, type) {
            // Sets the loading indicator to indicate data loading status
            state.loading = type;
        },
    },
    getters: {
        getProducts: (state) => {
            return state.products; // Returns the list of products
        },
        getCart: (state) => {
            return state.cart; // Returns the shopping cart items
        },
        getLoading: (state) => {
            return state.loading; // Returns the loading status
        },
        getTotalItems: (state) => {
            // Calculates the total number of items in the cart
            return state.cart.reduce((total, product) => {
                return total + product.quantity;
            }, 0);
        },
    },
    actions: {
        async fetchProducts({ commit }) {
            // Fetches products from an API
            commit('setLoading', true); // Indicates that data loading is in progress
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                const products = response.data.map((item) => {
                    return {
                        id: item.id,
                        name: item.title,
                        image: item.image,
                        category: item.category,
                        price: item.price,
                        quantity: 1, // Initializes the quantity to 1 for each product
                    };
                });
                commit('setProducts', products); // Sets the fetched products in the state
                commit('setLoading', false); // Indicates that data loading is complete
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        addToCart({ commit, state }, data) {
            // Adds a product to the cart or increments its quantity
            const existingProduct = state.cart.find((item) => item.id === data.id);

            if (existingProduct) {
                existingProduct.quantity++; // Increment quantity if the product exists in the cart
            } else {
                data.quantity = 1; // Initialize quantity to 1 for new products
                state.cart.push(data); // Add the product to the cart
            }

            commit('setCart', state.cart); // Update the cart in the store
            localStorage.setItem('cart', JSON.stringify(state.cart)); // Update localStorage with the modified cart
        },

        removeFromCart({ commit, state }, data) {
            // Removes a product from the cart or decreases its quantity
            const existingProductIndex = state.cart.findIndex((item) => item.id === data.id);

            if (existingProductIndex !== -1) {
                if (state.cart[existingProductIndex].quantity > 1) {
                    state.cart[existingProductIndex].quantity--;
                } else {
                    state.cart.splice(existingProductIndex, 1); // Remove the product from the cart if quantity is 1
                }

                commit('setCart', state.cart); // Update the cart in the store
            }
        },

        deleteFromCart({ commit, state }, productId) {
            // Deletes a product completely from the cart
            const index = state.cart.findIndex((item) => item.id === productId);

            if (index !== -1) {
                state.cart.splice(index, 1); // Remove the product from the cart
                commit('setCart', state.cart); // Update the cart in the store
            }
        },
    },
    modules: {},
});
