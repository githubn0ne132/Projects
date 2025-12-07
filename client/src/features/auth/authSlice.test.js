import authReducer, { reset } from './authSlice';

describe('Auth Slice', () => {
    const initialState = {
        user: null,
        token: null,
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: '',
    };

    it('should return the initial state', () => {
        expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
    });

    it('should handle reset', () => {
        const previousState = { ...initialState, isError: true, message: 'Error' };
        expect(authReducer(previousState, reset())).toEqual({
            ...initialState,
            isError: false,
            message: '',
        });
    });
});
