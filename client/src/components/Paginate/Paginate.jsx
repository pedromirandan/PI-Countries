import React from 'react'
import "./Paginate.css"

export function paginate(array, amountPerPage) {
    const result = [[]];
    let index = 0;
    array.forEach((e) => {
        if (!result[index]) result[index] = [];
        if (result[index].length < amountPerPage) result[index].push(e)
        else {
            index++;
            result[index] = [];
            result[index].push(e)
        }
    })
    return result;
}

export default function Paginate(props) {

    const { state, setState, maxIndex } = props;

    let { pageIndex } = state;

    function handleClick(event) {
        if (event.target.value === "next") {
            if (pageIndex < maxIndex) {
                setState({
                    ...state,
                    pageIndex: pageIndex + 1
                })
            }
        } else {
            if (pageIndex > 0) {
                setState({
                    ...state,
                    pageIndex: pageIndex - 1
                })
            }
        }
    }

    return (
        <div className='paginate'>
            <button className={!(pageIndex === 0) ? "button" : "disabled"} value="previous" onClick={handleClick}>{"<--"}</button>
            <p>{pageIndex + 1}</p>
            <button className={!(pageIndex === maxIndex) ? "button" : "disabled"} value="next" onClick={handleClick}>{"-->"}</button>
        </div>
    )
}
