/* SELECTORS */
export const getUser = ({ users }) => users;
/* ACTIONS */

// action name creator
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

const LOG_IN = createActionName('LOG_IN');

// action creators

export const logIn = payload => ({ type: LOG_IN, payload });

const usersReducer = (statePart = null, action) => {
     switch (action.type) {
          case LOG_IN:
               return action.payload;
          default:
               return statePart;
     }
};

export default usersReducer;