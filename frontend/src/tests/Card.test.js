import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState, useEffect, useRef, memo } from 'react';
import Card from '../components/Card';
import * as bg from '../assets/bg-test.png';
import {MemoryRouter} from "react-router-dom"

const cartoon = {
    avgrating: 4,
    nrating: 24,
    picture: bg,
    _id: 123123,
    title: "Batman",
};

test('Existence', () => {
    render(<MemoryRouter><Card className={"test"} cartoon={cartoon} /> </MemoryRouter>);

    const check = document.getElementsByClassName("test");
});

// test('Proper text', () => {
//     render(<Card title="goofy goober"/>);

//     const exist = screen.getByText("goofy goober");
// })

// test("Typing" , () => {
//     render(<Card type="submit"/>);

//     const button = document.getElementsByTagName("button").item(0);
//     const check = button.type == "submit";
// })

// test("Clicking", () => {
//     const handleClick = jest.fn();
//     render(<Card title="button" type='false' onc={handleClick}/>);
//     fireEvent.click(screen.getByText("button"));
//     expect(handleClick).toHaveBeenCalledTimes(1);
// });

// test("Spam clicking", () => {
//     const handleClick = jest.fn();
//     render(<Card title="button" type='false' onc={handleClick}/>);
//     fireEvent.click(screen.getByText("button"));
//     expect(handleClick).toHaveBeenCalledTimes(1);
//     fireEvent.click(screen.getByText("button"));
//     fireEvent.click(screen.getByText("button"));
//     fireEvent.click(screen.getByText("button"));
//     fireEvent.click(screen.getByText("button"));
//     fireEvent.click(screen.getByText("button"));
//     fireEvent.click(screen.getByText("button"));
//     expect(handleClick).toHaveBeenCalledTimes(7);

// });