import { API_URL } from '../config';
import shortid from 'shortid';

/* SELECTORS */
export const getAllAds = ({ ads }) => ads;
export const getAdById = ({ ads }, adId) => ads.find((ad) => ad._id === adId);

/* ACTIONS */

// action name creator
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;

const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const UPDATE_ADS = createActionName('UPDATE_ADS');
const REMOVE_AD = createActionName('REMOVE_AD');
const SEARCH_AD = createActionName('SEARCH_AD');

export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const updateAds = (payload) => ({ type: UPDATE_ADS, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });
export const searchAd = (searchPhrase) => ({
  type: SEARCH_AD,
  payload: { searchPhrase },
});

/* THUNKS */

export const loadAdsRequest = () => {
  return (dispatch) => {
    fetch(API_URL + '/ads')

      .then((res) => res.json())

      .then((ads) => dispatch(updateAds(ads), console.log('ads', ads)));
  };
};

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case EDIT_AD:
      return statePart.map((ad) =>
        ad.id === action.payload.id ? { ...ad, ...action.payload } : ad
      );
    case UPDATE_ADS:
      return [...action.payload];
    case ADD_AD:
      return [...statePart, { ...action.payload, id: shortid() }];
    case REMOVE_AD:
      return statePart.filter((ad) => ad._id !== action.payload);
    case SEARCH_AD:
      return statePart.filter((ad) => ad.title.includes(action.payload));
    default:
      return statePart;
  }
};

export default adsReducer;