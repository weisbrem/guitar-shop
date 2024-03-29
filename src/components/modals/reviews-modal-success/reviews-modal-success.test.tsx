import { Provider } from 'react-redux';
import { render, waitFor } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';

import ReviewsModalSuccess from './reviews-modal-success';

const mockStore = configureMockStore();

const store = mockStore();

const fakeComponent = (
  <Provider store={store}>
    <ReviewsModalSuccess />
  </Provider>
);

describe('component: ReviewsModalSuccess', () => {
  it('should render correctly', async () => {
    const { getByText, queryByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Спасибо за ваш отзыв!/i));
      expect(queryByText('К покупкам!'));
    });
  });
});
