const initialState = {
    id: 1,
    name:'',
    firstName:'',
    email:'',
    wallet:[],
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;