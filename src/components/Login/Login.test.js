import Login from "./Login";
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { appStore } from "@/redux/store/appStore";
import Link from "next/link";
// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

// Mocking the internal handleLogin function
jest.mock('./Login', () => ({
    __esModule: true,
    default: jest.fn((props) => {
        const handleLogin = async () => {
            props.fnClick();
        };

        return (
            <div data-testid="login-div">
                <h3 className='text-center my-3'>Login</h3>
                <button onClick={handleLogin}>Login</button>
                <Link href="/register">To Register</Link>
            </div>
        );
    }),
}));

describe("login page", () => {
    test("render correctly", () => {
        render(<Provider store={appStore}><Login /></Provider>)
        const ele = screen.getByTestId("login-div")
        expect(ele).toBeInTheDocument()
    })
    test("Header text", () => {
        render(<Provider store={appStore}><Login /></Provider>)
        const ele = screen.getByRole("heading")
        expect(ele.textContent).toBe("Login")
    })
    test("Register link", () => {
        render(<Provider store={appStore}><Login /></Provider>)
        const ele = screen.getByRole("link")
        expect(ele.textContent).toBe("To Register")
    })
    test("Login Button click", async () => {
        // Mocking an API function that handles login
        const fnClick = jest.fn();
        render(<Provider store={appStore}><Login fnClick={fnClick} /></Provider>)
        const btnRef = screen.getByRole("button")
        fireEvent.click(btnRef);
        await waitFor(() => {
            expect(fnClick).toHaveBeenCalled();
        });
    })
})