import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrMsg from "./ErrMsg";

describe('Error message component', () => {

  test('error message component renders as accessible element', () => {
    const message = "This is an error message";
    render(<ErrMsg message={message}/>);
    const errorMsg = screen.getByRole('alert');
    expect(errorMsg).toBeInTheDocument();
  });

  test('error message component displays the correct message', () => {
    const message = "This is an error message";
    render(<ErrMsg message={message}/>);
    const errorMsg = screen.getByRole('alert');
    expect(errorMsg).toHaveTextContent(message);
  });
});