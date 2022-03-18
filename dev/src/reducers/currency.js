const initialState = {
    id: 1,
    name:'',
    value:0,
    creationDate:'',
    history:[],
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;