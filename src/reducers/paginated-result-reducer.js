import BaseReducer from './base-reducer';

export const PaginatedResultInitialState = {
    items: [],
    count: 0,
    currentPage: 0,
    total: 0,
    offset: 0,
    loading: false
};

export class PaginatedResultReducer extends BaseReducer {
    constructor(action, name) {
        super();
        this.initialState = PaginatedResultInitialState;
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
                ...paginatedResultInitialState,
                loading: true
            }

        };
    }

    successFetch(state, action) {
        return {
            ...state,
            [this.storeName]: {
                ...state[this.storeName],
                items: action.payload.page ? [...state.items, ...action.payload.results] : action.payload.results,
                total: action.payload.count,
                offset: action.payload.offset,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                loading: false
            }
        };
    }


    failureFetch(state) {
        return {
            ...state,
            [this.storeName]: {
                ...paginatedResultInitialState,
                loading: false
            }
        };
    }
}
