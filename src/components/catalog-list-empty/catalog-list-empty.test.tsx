import { render, waitFor } from '@testing-library/react';

import CatalogListEmpty from './catalog-list-empty';

const fakeComponent = <CatalogListEmpty />;

describe('component: CatalogListEmpty', () => {
  it('should render correctly', async () => {
    const { getByText } = render(fakeComponent);

    await waitFor(() => {
      expect(getByText(/Тут должны быть наши гитары, но что-то пошло не так/i));
      expect(getByText(/Попробуйте обновите страницу/i));
    });
  });
});
