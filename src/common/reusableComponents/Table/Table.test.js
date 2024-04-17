import Table from "./Table";
import { screen, render, within } from '@testing-library/react'


describe("Table component tests", () => {
    test("Render correctly", () => {
        render(<Table headers={[]} rows={[]} tds={[]} />)
        const ele = screen.getByTestId("table-div");
        expect(ele).toBeInTheDocument();
    })

    test("Without rows", () => {
        render(<Table headers={[]} rows={[]} tds={[]} />)
        const ele = screen.getByTestId("no-data");
        expect(ele.textContent).toBe("No Data Found");
    })
    test("With rows and columns", () => {
        render(<Table headers={["Name", "Rno"]} rows={[{ name: "s1", rno: 1 }, { name: "s2", rno: 2 }]} tds={["name", "rno"]} />)
        const ths = screen.getAllByRole("columnheader")
        expect(ths[0].textContent).toBe("Name")
        const rows = screen.getAllByRole("row")
        const cells = within(rows[1]).getAllByRole("cell")
        expect(cells[1].textContent).toBe("2")
    })
})