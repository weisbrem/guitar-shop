import { ChangeEvent, useEffect, useState } from 'react';

import { useAppDispatch } from '../../hooks/hooks';

import { changeCartDeleteModalActive } from '../../store/modal-slice/modal-slice';
import {
  setCurrentAddedProduct,
  setDecProducts,
  setIncProducts,
  setUpdateProduct,
} from '../../store/order-slice/order-slice';

import { OrderProducts } from '../../types/order-products';
import { START_PAGE_NUMBER as MIN_ADDED_PRODUCTS, MAX_ADDED_PRODUCTS } from '../../utils/const';

interface ProductQuantityProps {
  product: OrderProducts;
}

function ProductQuantity({ product }: ProductQuantityProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number | string>('');
  const { numberOfProducts } = product;

  useEffect(() => {
    setQuantity(numberOfProducts);
  }, [numberOfProducts]);

  const handleDecButtonClick = () => {
    if (quantity === MIN_ADDED_PRODUCTS) {
      dispatch(changeCartDeleteModalActive(true));
      dispatch(setCurrentAddedProduct(product));
      setQuantity(MIN_ADDED_PRODUCTS);

      return;
    }

    dispatch(setDecProducts(product));
  };

  const handleIncButtonClick = () => {
    dispatch(setIncProducts(product));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    const currentQuantity = Number(value);

    if (value === '') {
      setQuantity('');
      return;
    }

    if (currentQuantity < MIN_ADDED_PRODUCTS) {
      setQuantity(MIN_ADDED_PRODUCTS);

      dispatch(changeCartDeleteModalActive(true));
      dispatch(setCurrentAddedProduct(product));

      dispatch(setUpdateProduct({ ...product, numberOfProducts: MIN_ADDED_PRODUCTS, totalPrice: product.price }));

      return;
    }

    if (currentQuantity > MAX_ADDED_PRODUCTS) {
      setQuantity(MAX_ADDED_PRODUCTS);

      dispatch(
        setUpdateProduct({
          ...product,
          numberOfProducts: MAX_ADDED_PRODUCTS,
          totalPrice: product.price * MAX_ADDED_PRODUCTS,
        }),
      );

      return;
    }

    setQuantity(currentQuantity);
    dispatch(
      setUpdateProduct({ ...product, numberOfProducts: currentQuantity, totalPrice: product.price * currentQuantity }),
    );
  };

  return (
    <div className="quantity cart-item__quantity">
      <button onClick={handleDecButtonClick} className="quantity__button" aria-label="Уменьшить количество">
        <svg width="8" height="8" aria-hidden="true">
          <use xlinkHref="#icon-minus"></use>
        </svg>
      </button>

      <input
        onChange={handleInputChange}
        className="quantity__input"
        type="number"
        placeholder={`${numberOfProducts}`}
        value={quantity}
        id="2-count"
        name="2-count"
        min="1"
        max="99"
      />

      <button onClick={handleIncButtonClick} className="quantity__button" aria-label="Увеличить количество">
        <svg width="8" height="8" aria-hidden="true">
          <use xlinkHref="#icon-plus"></use>
        </svg>
      </button>
    </div>
  );
}

export default ProductQuantity;
