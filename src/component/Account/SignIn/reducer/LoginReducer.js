const initialState = {
    username: null,
    userToken: null,
    isLoading: true,
    vendors: []
};

const LoginReducer = (state, action) => {
    // const { type, payload } = action;
    switch (action.type) {
        case 'RETRIEVE_TOKEN':
            return { ...state, userToken: action.token, isLoading: false, }
        case 'LOGOUT':
            return { ...state, userName: null, userToken: null, isLoading: false };
        case 'REGISTER':
            return { ...state, userName: action.id, userToken: action.token, isLoading: false };
        case 'LOGIN':
            return { ...state, userName: action.id, userToken: action.token, isLoading: false };
    }
}

export { initialState, LoginReducer };