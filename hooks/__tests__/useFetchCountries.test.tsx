import { renderHook, act } from "@testing-library/react-hooks";
import fetchMock from "jest-fetch-mock";

import useFetchCountries from "../useFetchCountries";

fetchMock.enableMocks();

describe("useFetchCountries hook", () => {
  it("should initially return an empty array", () => {
    const { result } = renderHook(() => useFetchCountries(""));
    expect(result.current).toEqual([]);
  });

  it("should fetch countries data when search query is provided", async () => {
    const mockResponse = [
      {
        name: { common: "Finland" },
        cca3: "FIN",
        region: "Europe",
        subregion: "Northern Europe",
        capital: ["Helsinki"],
        currencies: ["EUR"],
        languages: ["Finnish", "Swedish"],
        flag: "https://restcountries.com/data/fin.svg",
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchCountries("Finland"),
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current).toEqual(mockResponse);
    expect(fetchMock.mock.calls.length).toEqual(1);
  });

  it("should handle API errors gracefully", async () => {
    fetchMock.mockReject(() => Promise.reject("API is down"));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchCountries("error-test"),
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current).toEqual([]);
    expect(fetchMock.mock.calls.length).toEqual(2);
  });
});
