import { render } from "@testing-library/react-native";
import * as ExpoRouter from "expo-router";
import React from "react";

import Country from "../country";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

const mockUseLocalSearchParams = ExpoRouter.useLocalSearchParams as jest.Mock;

describe("Country Component", () => {
  it("renders correctly with valid country data", () => {
    const mockCountryData = {
      name: { common: "Canada" },
      cca2: "CA",
      capital: "Ottawa",
      region: "Americas",
      subregion: "North America",
      population: 37742154,
      languages: JSON.stringify({ en: "English", fr: "French" }),
      latlng: JSON.stringify([56.130366, -106.346771]),
    };

    mockUseLocalSearchParams.mockReturnValue(mockCountryData);

    const { getByText, getByTestId } = render(<Country />);

    expect(getByText("Canada")).toBeTruthy();
    expect(getByText("🏛 Ottawa")).toBeTruthy();
    expect(getByText("🗺 Americas")).toBeTruthy();
    expect(getByText("👥 37,742,154")).toBeTruthy();
    expect(getByText("💬 English, French")).toBeTruthy();
  });
});
