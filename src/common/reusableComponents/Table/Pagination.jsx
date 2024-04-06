import React from "react";
export const Pagination = ({ currPage, setCurrPage, totalPages }) => {
    const inputRef = React.useRef()
    const fnGo = () => {
        const pageNo = inputRef.current.value;
        if (pageNo < 1 || pageNo > totalPages) {
            alert("Invalid Entry");
            return;
        }
        setCurrPage(Number(pageNo))
    }
    const fnNext = () => {
        setCurrPage(currPage + 1)
    }

    const fnPrev = () => {
        setCurrPage(currPage - 1)
    }
    return <div className="row">
        <div className="col-4">
            <span>Go To :<input ref={inputRef} type="number" /><button onClick={fnGo}>Go</button></span>
        </div>
        <div className="col-4 text-center">
            <button onClick={fnPrev} disabled={currPage == 1}>Prev</button>{currPage}<button onClick={fnNext} disabled={currPage == totalPages}>Next</button>
        </div>
        <div className="col-4 text-end">
            <span>Total Pages:{totalPages}</span>
        </div>

    </div>
}