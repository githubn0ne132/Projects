import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import authReducer from '../features/auth/authSlice';
import Login from '../pages/Login';
import { describe, it, expect } from 'vitest';

const createTestStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
        },
    });
};

describe('Login Component', () => {
    it('renders login form', () => {
        const store = createTestStore();
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
    });

    it('updates input fields', () => {
         const store = createTestStore();
         render(
             <Provider store={store}>
                 <MemoryRouter>
                     <Login />
                 </MemoryRouter>
             </Provider>
         );

         const emailInput = screen.getByLabelText(/Email/i);
         fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
         expect(emailInput.value).toBe('test@test.com');
    });
});
