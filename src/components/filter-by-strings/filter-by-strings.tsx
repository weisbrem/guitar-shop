import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import {
  selectguitarsStringCounts,
  selectGuitarsType,
  setGuitarsStringCounts,
} from '../../store/filter-slice/filter-slice';
import { fetchGuitarsAction } from '../../store/guitars-slice/guitars-slice';
import { redirectToRoute } from '../../store/middlewares/redirect-action';

import { AppRoute, GuitarsStringMap, START_PAGE_NUMBER } from '../../utils/const';

function FilterByStrings(): JSX.Element {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  const guitarType = useAppSelector(selectGuitarsType);
  const guitarsStringCounts = useAppSelector(selectguitarsStringCounts);

  const checkDisabled = (count: number) => {
    if (guitarType.length === 0) {
      return false;
    }

    return !guitarsStringCounts.includes(`${count}`);
  };

  const handleStringCountsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    const stringCounts = guitarsStringCounts.includes(value)
      ? guitarsStringCounts.filter((count) => count !== value)
      : [...guitarsStringCounts, value];

    dispatch(setGuitarsStringCounts(stringCounts));
    dispatch(
      fetchGuitarsAction({
        activePageNumber: Number(number),
        stringCount: stringCounts,
        guitarType,
      }),
    );

    if (Number(number) !== undefined && Number(number) !== START_PAGE_NUMBER) {
      dispatch(redirectToRoute(AppRoute.Root));
    }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Количество струн</legend>

      {GuitarsStringMap.map(({ id, stringCount }) => (
        <div className="form-checkbox catalog-filter__block-item" key={stringCount}>
          <input
            onChange={handleStringCountsChange}
            className="visually-hidden"
            type="checkbox"
            id={id}
            name={id}
            value={stringCount}
            checked={guitarsStringCounts.includes(`${stringCount}`)}
            disabled={checkDisabled(stringCount)}
          />
          <label htmlFor={id}>{stringCount}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default FilterByStrings;
