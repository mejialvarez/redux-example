import React from 'react';
import { render, mount } from 'enzyme';
import configureStore from 'redux-mock-store'
import ProductList from '../../components/ProductList';

const mockStore = configureStore();

it("renders no products when store empty", () => {
  const store = mockStore({ products: [] });

  const wrapper = render(<ProductList store={store} />);
  expect(wrapper.find(".product").length).toBe(0);
});

it("renders products", () => {
  const store = mockStore({ 
    products: [{ "id": 1, "name": "Product", "price": 100, "image": "" }] 
  });

  const wrapper = render(<ProductList store={store} />);
  expect(wrapper.find(".product").length).toBe(1);
});

it("adds a product to the shopping cart", () => {
  const store = mockStore({ 
    products: [{ "id": 1, "name": "Product", "price": 100, "image": "" }] 
  });

  const wrapper = mount(<ProductList store={store} />);
  wrapper.find(".product button").first().simulate('click');

  const actions = store.getActions();
  expect(actions.length).toBe(1);
  expect(actions[0].type).toBe('ADD_TO_CART');
  expect(actions[0].product).not.toBeNull();
});