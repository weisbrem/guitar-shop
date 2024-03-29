import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import ModalContainer from '../../components/modal-container/modal-container';
import CardAddModal from '../../components/modals/cart-add-modal/cart-add-modal';
import CardAddSuccessModal from '../../components/modals/cart-add-success-modal/cart-add-success-modal';
import Rating from '../../components/rating/rating';
import Reviews from '../../components/reviews/reviews';
import Tabs from '../../components/tabs/tabs';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeCurrentPage } from '../../store/app-slice/app-slice';
import { fetchCommentsAction, resetCommentsCounter, selectComments } from '../../store/comments-slice/comments-slice';
import { fetchGuitarAction, selectGuitar } from '../../store/guitars-slice/guitars-slice';
import {
  changeCartAddModalActive,
  selectCartAddModalActive,
  selectCartAddSuccessModalActive,
} from '../../store/modal-slice/modal-slice';
import { setCurrentAddedProduct } from '../../store/order-slice/order-slice';

import { MenuLabel, START_PAGE_NUMBER as MIN_NUMBER_OF_PRODUCT } from '../../utils/const';
import { getPriceWithSpace } from '../../utils/utils';

import styles from './product.module.css';

function Product(): JSX.Element | null {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const guitar = useAppSelector(selectGuitar);
  const comments = useAppSelector(selectComments);

  const isCardAddModalOpen = useAppSelector(selectCartAddModalActive);
  const isCardAddSuccessModalOpen = useAppSelector(selectCartAddSuccessModalActive);

  const selectGuitarId = Number(id);

  useEffect(() => {
    dispatch(resetCommentsCounter());
    dispatch(fetchGuitarAction(selectGuitarId));
    dispatch(fetchCommentsAction(selectGuitarId));
    dispatch(changeCurrentPage(MenuLabel.Product));
  }, [dispatch, selectGuitarId]);

  if (!guitar) {
    return null;
  }

  const { name, type, price, previewImg, rating, stringCount, vendorCode, description } = guitar;

  const handleButtonAddClick = () => {
    dispatch(
      setCurrentAddedProduct({
        ...guitar,
        comments,
        numberOfProducts: MIN_NUMBER_OF_PRODUCT,
        totalPrice: guitar.price,
      }),
    );
    dispatch(changeCartAddModalActive(true));
  };

  return (
    <div className="container">
      <h1 className="page-content__title title title--bigger">{name}</h1>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item">
          <Link className="link" to="/">
            Главная
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to="/">
            Каталог
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="link" href="/">
            {name}
          </a>
        </li>
      </ul>
      <div className="product-container">
        <div className={styles['img-container']}>
          <img className="product-container__img" src={`../../${previewImg}`} width="90" height="235" alt={name} />
        </div>
        <div className="product-container__info-wrapper">
          <h2 className="product-container__title title title--big title--uppercase">{name}</h2>

          <Rating
            rating={rating}
            className={'product-container__rating'}
            currentPosition={'product'}
            comments={comments}
          />

          <Tabs vendorCode={vendorCode} type={type} stringCount={stringCount} description={description} />
        </div>
        <div className="product-container__price-wrapper">
          <p className="product-container__price-info product-container__price-info--title">Цена:</p>
          <p className="product-container__price-info product-container__price-info--value">
            {getPriceWithSpace(price)} ₽
          </p>
          <button
            onClick={handleButtonAddClick}
            className="button button--red button--big product-container__button"
            type="button">
            Добавить в корзину
          </button>
        </div>
      </div>

      <Reviews />

      {isCardAddModalOpen && <ModalContainer children={<CardAddModal />} />}
      {isCardAddSuccessModalOpen && <ModalContainer className="modal--success" children={<CardAddSuccessModal />} />}
    </div>
  );
}

export default Product;
