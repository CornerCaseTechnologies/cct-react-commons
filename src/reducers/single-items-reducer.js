import BaseReducer from './base-reducer';

export const SingleItemsInitialState = {
    items: null,
    loading: false
};

export class SingleItemsResultReducer extends BaseReducer {
    constructor(action, name) {
        super();
        this.initialState = SingleItemsInitialState;
        this.storeName = name;
        this.ACTION_HANDLERS = {
            [action.SUCCESS]: this.successFetch.bind(this),
            [action.FAILURE]: this.failureFetch.bind(this),
            [action.REQUEST]: this.request.bind(this)
        };
    }

    request(state) {
        return {
            ...state,
            [this.storeName]: {
                ...SingleItemsInitialState,
                loading: true
            }

        };
    }

    successFetch(state, action) {
        return {
            ...state,
            [this.storeName]: {
                items: action.payload,
                loading: false
            }
        };
    }


    failureFetch(state) {
        return {
            ...state,
            [this.storeName]: {
                ...SingleItemsInitialState,
                loading: false
            }
        };
    }
}
