/* SELECTORS */
export const getUserData = ({ user }) => user;

/* ACTIONS */

// action name creator
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

const ADD_USER_INFO = createActionName('ADD_USER_INFO');

// action creators

export const addUserInfo = (payload) => ({ type: ADD_USER_INFO, payload });

const userReducer = (statePart = null, action) => {
    switch (action.type) {
      case ADD_USER_INFO:
        return action.payload
      default:
      return statePart;
    }
};

export default userReducer;