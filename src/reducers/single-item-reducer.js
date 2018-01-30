import BaseReducer from './base-reducer';

export const SingleItemInitialState = {
    item: null,
    loading: false
};

export class SingleItemResultReducer extends BaseReducer {
    constructor(action, name) {
        super();
        this.initialState = SingleItemInitialState;
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
                ...SingleItemInitialState,
                loading: true
            }

        };
    }

    successFetch(state, action) {
        return {
            ...state,
            [this.storeName]: {
                item: action.payload,
                loading: false
            }
        };
    }


    failureFetch(state) {
        return {
            ...state,
            [this.storeName]: {
                ...SingleItemInitialState,
                loading: false
            }
        };
    }
}
