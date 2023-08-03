import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState, useEffect, useRef, memo } from 'react';
import Button from '../components/Button';



test('Existence', () => {
    render(<Button/>);

    const check = document.getElementsByTagName("button");
});

test('Proper text', () => {
    render(<Button title="goofy goober"/>);

    const exist = screen.getByText("goofy goober");
})

test("Typing" , () => {
    render(<Button type="submit"/>);

    const button = document.getElementsByTagName("button").item(0);
    const check = button.type == "submit";
})

test("Clicking", () => {
    const handleClick = jest.fn();
    render(<Button title="button" type='false' onc={handleClick}/>);
    fireEvent.click(screen.getByText("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
});

test("Spam clicking", () => {
    const handleClick = jest.fn();
    render(<Button title="button" type='false' onc={handleClick}/>);
    fireEvent.click(screen.getByText("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText("button"));
    fireEvent.click(screen.getByText("button"));
    fireEvent.click(screen.getByText("button"));
    fireEvent.click(screen.getByText("button"));
    fireEvent.click(screen.getByText("button"));
    fireEvent.click(screen.getByText("button"));
    expect(handleClick).toHaveBeenCalledTimes(7);

});