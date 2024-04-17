import { Footer } from "@/components/Footer";

import { render, screen } from '@testing-library/react'

describe("Footer tests", () => {
    it("render correctly", () => {
        render(<Footer />)
        const footerEle = screen.getByTestId("footer")
        expect(footerEle).toBeInTheDocument()
    })

    it("Check footer content", () => {
        render(<Footer />)
        const footerEle = screen.getByTestId("footer")
        expect(footerEle.textContent).toBe("© rights belongs to me.")
    })

})