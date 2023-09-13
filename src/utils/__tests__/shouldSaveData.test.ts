import { describe, expect, it } from "vitest";
import shouldSaveData from "../shouldSaveData";
import { SAVE_DATA_COOKIE } from "../../constants";

describe("shouldSaveData", () => {
  it("should return false if SAVE_DATA_COOKIE is not set", () => {
    expect(shouldSaveData()).toBe(false);
  });

  it('should return false if SAVE_DATA_COOKIE is set to anything other than "true"', () => {
    document.cookie = `${SAVE_DATA_COOKIE}=false`;
    expect(shouldSaveData()).toBe(false);

    document.cookie = `${SAVE_DATA_COOKIE}=truee`;
    expect(shouldSaveData()).toBe(false);

    document.cookie = `${SAVE_DATA_COOKIE}=1`;
    expect(shouldSaveData()).toBe(false);

    document.cookie = `${SAVE_DATA_COOKIE}=0`;
    expect(shouldSaveData()).toBe(false);
  });

  it('should return true if SAVE_DATA_COOKIE is set to "true"', () => {
    document.cookie = `${SAVE_DATA_COOKIE}=true`;
    expect(shouldSaveData()).toBe(true);
  });

  it('should return true if SAVE_DATA_COOKIE is set to "true" with other cookies', () => {
    document.cookie = `otherCookie=123; ${SAVE_DATA_COOKIE}=true; anotherCookie=456`;
    expect(shouldSaveData()).toBe(true);
  });

  it('should return true if SAVE_DATA_COOKIE is set to "true" with spaces and other cookies', () => {
    document.cookie = ` otherCookie=123 ; ${SAVE_DATA_COOKIE}=true ; anotherCookie=456 `;
    expect(shouldSaveData()).toBe(true);
  });
});
