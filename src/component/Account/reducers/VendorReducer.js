import {
    SET_LOADING, FETCH_COMPLETE,
    INPUT_VENDOR, SUBMIT_VENDOR, IMAGE_VENDOR,
    EDIT_VENDOR, DELETE_VENDOR, UPDATE_VENDOR, RETRIEVE_TOKEN, LOGIN, REGISTER, LOGOUT
} from './VendorAction'

const defaultFormUnits = {
    id: undefined,
    name: "",
    price: 0,
    description: "",
    picture: undefined,
    idType: "",
    idVendor: "",
}

const defaultFormValues = {
    id: undefined,
    name: '',
    username: '',
    email: '',
    password: '',
    gender: '',
    company: '',
    photo: null,
    address: '',
    units: []
}

const initialState = {
    isLoading: false,
    check_textInputChange: false,
    secureTextEntry: true,
    vendors: [],
    photo: '',
    form: { ...defaultFormValues }
}

function vendorReducer(state, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LOADING:
            return { ...state, isLoading: true }

        case FETCH_COMPLETE:
            console.log('MASUK FETCH');

            return { ...state, form: { ...payload }, isLoading: false }
        case DELETE_VENDOR:
            return { ...state, vendors: state.vendors.filter((vendor) => (vendor.id !== payload)) };

        case UPDATE_VENDOR:
            return { ...state, vendors: state.vendors.map((vendor) => vendor.id ? payload : vendor) };

        case EDIT_VENDOR:
            const vendor = state.vendors.find((vendor) => vendor.id === payload)
            return { ...state, form: { ...vendor } }


        case INPUT_VENDOR:
            const { inputName, inputValue } = payload;
            const form = { ...state.form };
            form[inputName] = inputValue;
            return { ...state, form: { ...form } };

        case SUBMIT_VENDOR:
            return { ...state, isLoading: false, form: { ...defaultFormValues } };
        default:
            return { ...state };
    }
}

export { initialState, vendorReducer };