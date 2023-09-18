import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ProductsView from '@/views/ProductsView.vue';
import { BContainer, BRow, BSpinner, BPagination, BCol } from 'bootstrap-vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component('b-container', BContainer);
localVue.component('b-row', BRow);
localVue.component('b-spinner', BSpinner);
localVue.component('b-pagination', BPagination);
localVue.component('b-col', BCol);


describe('ProductsView.vue', () => {
  let wrapper;
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      fetchProducts: jest.fn(),
    };

    store = new Vuex.Store({
      state: {
        loading: false,
      },
      getters: {
        getProducts: () => [
          // Add sample products data for testing displayedProducts computed property
          { id: 1, name: 'Product 1', price: 10 },
          { id: 2, name: 'Product 2', price: 20 },
          { id: 3, name: 'Product 3', price: 30 },
        ],
      },
      actions,
    });

    wrapper = shallowMount(ProductsView, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('fetches products when created', () => {
    expect(actions.fetchProducts).toHaveBeenCalled();
  });

  it('computes the displayedProducts correctly', () => {
    // Assuming itemsPerPage is set to 5 as in your component
    expect(wrapper.vm.displayedProducts).toEqual([
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
      { id: 3, name: 'Product 3', price: 30 },
    ]);
  });

  it('updates loading when the store loading state changes', () => {
    // Simulate a change in the loading state
    store.state.loading = true;

    // Wait for Vue to update the component
    return wrapper.vm.$nextTick().then(() => {
      expect(wrapper.vm.loading).toBe(true);
    });
  });

});
