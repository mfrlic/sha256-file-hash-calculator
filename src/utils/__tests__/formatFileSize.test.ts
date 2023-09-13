import { describe, expect, it } from "vitest";
import formatFileSize from "../formatFileSize";

describe("formatFileSize", () => {
  it('should return "N/A" for falsy input', () => {
    expect(formatFileSize(undefined)).toBe("N/A");
    expect(formatFileSize()).toBe("N/A");
  });

  it('should return "0 Bytes" for zero input', () => {
    expect(formatFileSize(0)).toBe("0 Bytes");
  });

  it("should format file sizes correctly", () => {
    expect(formatFileSize(1024)).toBe("1 KB");
    expect(formatFileSize(Math.pow(1024, 2))).toBe("1 MB");
    expect(formatFileSize(Math.pow(1024, 3))).toBe("1 GB");
    expect(formatFileSize(Math.pow(1024, 4))).toBe("1 TB");
    expect(formatFileSize(1024 * 2)).toBe("2 KB");
    expect(formatFileSize(Math.pow(1024, 2) * 2)).toBe("2 MB");
    expect(formatFileSize(Math.pow(1024, 3) * 2)).toBe("2 GB");
    expect(formatFileSize(Math.pow(1024, 4) * 2)).toBe("2 TB");
    expect(formatFileSize(100)).toBe("100 Bytes");
    expect(formatFileSize(999)).toBe("999 Bytes");
    expect(formatFileSize(Math.pow(1024, 2) * 1.18)).toBe("1.18 MB");
    expect(formatFileSize(Math.pow(1024, 3) * 1.15)).toBe("1.15 GB");
    expect(formatFileSize(Math.pow(1024, 4) * 1.12)).toBe("1.12 TB");
  });
});
