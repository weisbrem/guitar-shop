import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import qs from 'query-string';

import FilterForm from '../filter-form/filter-form';
import Sorting from '../sorting/sorting';
import ProductCard from '../product-card/product-card';
import CatalogListEmpty from '../catalog-list-empty/catalog-list-empty';
import Pagination from '../pagination/pagination';
import ModalContainer from '../modal-container/modal-container';
import CardAddModal from '../modals/cart-add-modal/cart-add-modal';
import CardAddSuccessModal from '../modals/cart-add-success-modal/cart-add-success-modal';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  changeOrderType,
  changeSortType,
  fetchGuitarsAction,
  selectGuitars,
  selectOrderType,
  selectSortType,
} from '../../store/guitars-slice/guitars-slice';
import {
  fetchMinPrice,
  selectguitarsStringCounts,
  selectGuitarsType,
  selectPriceMax,
  selectPriceMin,
  setGuitarsStringCounts,
  setGuitarsType,
  setPrice,
} from '../../store/filter-slice/filter-slice';
import { selectCartAddModalActive, selectCartAddSuccessModalActive } from '../../store/modal-slice/modal-slice';

function CatalogList(): JSX.Element {
  const { number } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const guitars = useAppSelector(selectGuitars);
  const sortType = useAppSelector(selectSortType);
  const orderType = useAppSelector(selectOrderType);
  const guitarMinPrice = useAppSelector(selectPriceMin);
  const guitarMaxPrice = useAppSelector(selectPriceMax);
  const guitarsType = useAppSelector(selectGuitarsType);
  const guitarsStringCounts = useAppSelector(selectguitarsStringCounts);

  const isCardAddModalOpen = useAppSelector(selectCartAddModalActive);
  const isCardAddSuccessModalOpen = useAppSelector(selectCartAddSuccessModalActive);

  const isEmpty = guitars.length === 0;

  useEffect(() => {
    let filter = {};
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const { _sort, _order, price_gte, price_lte, type, stringCount } = params;

      if (_sort !== '' && typeof _sort === 'string') {
        filter = { ...filter, sortType: _sort };
        dispatch(changeSortType(_sort));
      }

      if (_order !== '' && typeof _order === 'string') {
        filter = { ...filter, orderType: _order };
        dispatch(changeOrderType(_order));
      }

      if (price_gte !== '' && price_lte !== '' && typeof price_gte === 'string' && typeof price_lte === 'string') {
        filter = { ...filter, min: price_gte, max: price_lte };

        dispatch(
          setPrice({
            priceMin: price_gte,
            priceMax: price_lte,
          }),
        );
      }

      if (type?.length !== 0 && (Array.isArray(type) || typeof type === 'string')) {
        filter = { ...filter, guitarsType: type };
        if (typeof type === 'string') {
          dispatch(setGuitarsType([type]));
        } else {
          dispatch(setGuitarsType(type as string[]));
        }
      }

      if (stringCount?.length !== 0 && (Array.isArray(stringCount) || typeof stringCount === 'string')) {
        filter = { ...filter, stringCount };

        if (typeof stringCount === 'string') {
          dispatch(setGuitarsStringCounts([stringCount]));
        } else {
          dispatch(setGuitarsStringCounts(stringCount as string[]));
        }
      }

      dispatch(fetchGuitarsAction({ activePageNumber: Number(number), ...filter }));
      dispatch(fetchMinPrice());
    }
  }, [dispatch, number]);

  useEffect(() => {
    const query = qs.stringify(
      {
        _sort: sortType,
        _order: orderType,
        price_gte: guitarMinPrice,
        price_lte: guitarMaxPrice,
        type: guitarsType,
        stringCount: guitarsStringCounts,
      },
      { skipNull: true, skipEmptyString: true },
    );

    navigate(`?${query}`);
  }, [guitarMaxPrice, guitarMinPrice, guitarsStringCounts, guitarsType, navigate, orderType, sortType]);

  return (
    <div className="catalog">
      <FilterForm />

      <Sorting />

      {isEmpty ? (
        <CatalogListEmpty />
      ) : (
        <div className="cards catalog__cards">
          {guitars.map((guitar) => (
            <ProductCard guitar={guitar} key={guitar.id} />
          ))}
        </div>
      )}

      <Pagination />

      {isCardAddModalOpen && <ModalContainer children={<CardAddModal />} />}
      {isCardAddSuccessModalOpen && <ModalContainer className="modal--success" children={<CardAddSuccessModal />} />}
    </div>
  );
}

export default CatalogList;
