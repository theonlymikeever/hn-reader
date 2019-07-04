import moment from 'moment';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);
    const saved = moment(parsedState._createdDate);
    const now = moment();
    // Check to see if the state is older than one day
    if (now.diff(saved, 'days') > 1) {
      return undefined;
    }
    return parsedState;
  } catch (err) {
    // in case of any errors, the reducers will initialize the state
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log('Error saving state to localStorage:', err)
  }
}
