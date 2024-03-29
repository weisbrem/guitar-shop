import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import Header from './header';

import { mockOrderProduct, mockProduct } from '../../utils/mock';

const mockStore = configureMockStore();

const store = mockStore({
  App: {},
  Comments: {},
  Guitars: {
    guitars: [mockProduct],
    guitarsSearch: [],
  },
  Filter: {},
  Modal: {},
  Order: {
    products: mockOrderProduct,
  },
});

const fakeComponent = (
  <Provider store={store}>
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  </Provider>
);

describe('component: Header', () => {
  it('should render correctly', async () => {
    const { getByText, getByPlaceholderText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Каталог/i));
      expect(getByText(/Где купить?/i));
      expect(getByText(/О компании/i));
      expect(getByPlaceholderText(/что вы ищите?/i));
    });
  });
});
