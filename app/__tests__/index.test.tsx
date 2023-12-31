import { render, fireEvent, act } from "@testing-library/react-native";
import React from "react";

import useFetchCountries from "../../hooks/useFetchCountries";
import Main from "../index";

jest.mock("../../hooks/useFetchCountries");

const mockUseFetchCountries = useFetchCountries as jest.Mock;

describe("Main Component", () => {
  beforeEach(() => {
    mockUseFetchCountries.mockReset();
  });

  it("renders correctly", () => {
    mockUseFetchCountries.mockReturnValue([]);

    const { getByText, getByPlaceholderText } = render(<Main />);

    expect(getByText("Country Explorer")).toBeTruthy();
    expect(getByPlaceholderText("Search for a country...")).toBeTruthy();
  });

  it("updates search query on text input", () => {
    mockUseFetchCountries.mockReturnValue([]);

    const { getByPlaceholderText } = render(<Main />);
    const searchInput = getByPlaceholderText("Search for a country...");

    act(() => {
      fireEvent.changeText(searchInput, "Canada");
    });
  });

  it("displays countries returned by useFetchCountries hook", () => {
    const mockCountries = [
      {
        name: { common: "Canada" },
        cca3: "CAN",
        region: "Americas",
        subregion: "Northern America",
        capital: ["Ottawa"],
        currencies: ["CAD"],
        languages: ["English", "French"],
        flag: "https://restcountries.com/data/can.svg",
      },
    ];

    mockUseFetchCountries.mockReturnValue(mockCountries);

    const { getByText } = render(<Main />);

    expect(getByText("Canada")).toBeTruthy();
  });
});
