import Login from "./Login";
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { appStore } from "@/redux/store/appStore";

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
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
    test("Login Button click", () => {
        render(<Provider store={appStore}><Login /></Provider>)
        const mockSubmit = jest.fn();
        jest.spyOn("handleLogin", mockSubmit).mockImplementationOnce();
        const btnRef = screen.getByRole("button")
        fireEvent.submit(btnRef);
        expect(mockSubmit).toHaveBeenCalledTimes(1);
    })
})