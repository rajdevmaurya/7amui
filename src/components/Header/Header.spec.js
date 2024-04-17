import { expect } from "@playwright/test";
import Header from "./Header";
import { render, screen } from '@testing-library/react'

describe("Header component tests", () => {
    it("render correctly", () => {
        render(<Header />)
        const ele = screen.getByTestId("headingDiv")
        expect(ele).toBeInTheDocument()
    })
    test("Check header text", () => {
        render(<Header />)
        const ele = screen.getByTestId("headingDiv")
        expect(ele.textContent).toBe("End to End Application")
    })

})


