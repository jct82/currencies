const initialState = {
    id: 1,
    amount:0,
    buyDate:'',
    sellDate:'',
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;