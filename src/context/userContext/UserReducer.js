const UserReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_USER_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "UPDATE_USER_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "UPDATE_USER_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            };
        default: return { ...state };
    }
}

export default UserReducer;