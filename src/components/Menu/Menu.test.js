import { Menu } from "./Menu";
import { screen, render } from '@testing-library/react'

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe("Menu component tests", () => {
    it("render correctly", () => {
        render(<Menu />)
        const ele = screen.getByTestId("menu-test-id")
        expect(ele).toBeInTheDocument()
    })
    it("test menu items count", () => {
        render(<Menu />)
        const listItems = screen.getAllByRole("listitem")
        expect(listItems.length).toBe(4)
    })
    it("test menu items Text", () => {
        render(<Menu />)
        const menuItems = screen.getAllByRole("link")
        expect(menuItems[0].textContent).toBe("Home")
        expect(menuItems[0].getAttribute("href")).toBe("home")
    })
})