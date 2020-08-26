import { SET_LOADING, FETCH_COMPLETE, EDIT_UNIT, DELETE_UNIT } from './UnitAction';

const defaultFormValues = {
    id: undefined,
    name: "",
    price: 0,
    description: "",
    picture: undefined,
    idType: "",
    idVendor: ""
}

const initialState = {
    isLoading: true,
    units: [],
    rooms: [],
    form: { ...defaultFormValues }
}

function unitReducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_LOADING:
            return { ...state, isLoading: true }

        case FETCH_COMPLETE:
            console.log('MASUK FETCH');

            return { ...state, form: { ...payload }, isLoading: false }

        case DELETE_UNIT:
            return { ...state, units: state.units.filter((unit) => (unit.id !== payload)) };

        case EDIT_UNIT:
            const unit = state.units.find((unit) => unit.id === payload)
            return { ...state, form: { ...unit } };

        default:
            return { ...state };

    }
}

export { initialState, unitReducer }