import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buildProductQueryParams } from '../utils/productQuery';
import {
  getHomeData,
  getMensData,
  getPaintingData,
  getWomensData,
  getAccessoriesData,
  getFootwearData,
  getHomeDecorData,
  searchProductsHome,
} from '../Redux/AppRedux/action';

const FETCH_MAP = {
  home: getHomeData,
  mens: getMensData,
  womens: getWomensData,
  painting: getPaintingData,
  accessories: getAccessoriesData,
  footwear: getFootwearData,
  homeDecor: getHomeDecorData,
};

const STORE_KEYS = {
  home: 'home',
  mens: 'mens',
  womens: 'womens',
  painting: 'painting',
  accessories: 'accessories',
  footwear: 'footwear',
  homeDecor: 'homeDecor',
};

/** Fetch products whenever URL search params change (filters, sort, search) */
export const useProductFetch = (category = 'home') => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const retried = useRef(false);
  const queryKey = searchParams.toString();
  const storeKey = STORE_KEYS[category] || category;
  const products = useSelector((store) => store.AppRedux[storeKey]) || [];

  useEffect(() => {
    let cancelled = false;
    retried.current = false;

    const doFetch = () => {
      const q = searchParams.get('q');
      const queryParams = buildProductQueryParams(queryKey ? `?${queryKey}` : '');

      const fetchAction =
        q && category === 'home'
          ? searchProductsHome(q)
          : FETCH_MAP[category](queryParams);

      return dispatch(fetchAction);
    };

    setLoading(true);
    setFetchError(false);

    doFetch()
      .then(() => {
        if (cancelled) return;
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        // Retry once on failure
        if (!retried.current) {
          retried.current = true;
          return doFetch()
            .then(() => { if (!cancelled) setLoading(false); })
            .catch(() => {
              if (!cancelled) {
                setLoading(false);
                setFetchError(true);
              }
            });
        }
        setLoading(false);
        setFetchError(true);
      });

    return () => { cancelled = true; };
  }, [queryKey, dispatch, category, searchParams]);

  const retry = () => {
    setLoading(true);
    setFetchError(false);
    const q = searchParams.get('q');
    const queryParams = buildProductQueryParams(queryKey ? `?${queryKey}` : '');
    const fetchAction =
      q && category === 'home'
        ? searchProductsHome(q)
        : FETCH_MAP[category](queryParams);

    dispatch(fetchAction)
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setFetchError(true);
      });
  };

  return { loading, searchParams, fetchError, retry, products };
};
