import { describe, expect, it } from "vitest";
import formatTime from "../formatTime";

describe("formatTime", () => {
  it('should return "N/A" when input is falsy', () => {
    expect(formatTime(undefined)).toBe("N/A");
    expect(formatTime(0)).toBe("N/A");
  });

  it("should format milliseconds to hours, minutes, and seconds ", () => {
    expect(formatTime(3661000)).toBe("1 hour, 1 minute, 1 second");
    expect(formatTime(90000)).toBe("1 minute, 30 seconds");
    expect(formatTime(61000)).toBe("1 minute, 1 second");
    expect(formatTime(60000)).toBe("1 minute");
    expect(formatTime(1000)).toBe("1 second");
    expect(formatTime(100)).toBe("100 milliseconds");
    expect(formatTime(10)).toBe("10 milliseconds");
    expect(formatTime(1)).toBe("1 millisecond");
  });

  it("should format milliseconds with a maximum of 2 decimal places", () => {
    expect(formatTime(100)).toBe("100 milliseconds");
    expect(formatTime(100.5)).toBe("100.5 milliseconds");
    expect(formatTime(100.1234)).toBe("100.12 milliseconds");
  });
});
