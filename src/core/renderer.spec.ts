import { loadAndDisplayHTML } from "./renderer";
import { describe, beforeEach, afterEach, expect, test, vi } from 'vitest'

describe("loadAndDisplayHTML", () => {
  const mockContainer = document.createElement("div");

  beforeEach(() => {
    mockContainer.innerHTML = "";
    vi.spyOn(document, "querySelector").mockReturnValue(mockContainer);
    vi.spyOn(console, "error").mockImplementation(() => { });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("injects HTML content into the container with replaced props", async () => {
    const containerSelector = "#test-container";
    const htmlContent = "<div>${name}</div>";
    const props = { name: "Test Name" };

    await loadAndDisplayHTML(containerSelector, htmlContent, props);

    expect(document.querySelector).toHaveBeenCalledWith(containerSelector);
    expect(mockContainer.innerHTML).toBe("<div>Test Name</div>");
    expect(console.error).not.toHaveBeenCalled();
  });

  test("logs an error when container is not found", async () => {
    vi.spyOn(document, "querySelector").mockReturnValueOnce(null);
    const containerSelector = "#missing-container";
    const htmlContent = "<div>Content</div>";
    const props = {};

    await loadAndDisplayHTML(containerSelector, htmlContent, props);

    expect(document.querySelector).toHaveBeenCalledWith(containerSelector);
    expect(console.error).toHaveBeenCalledWith(
      "Container not found:",
      containerSelector,
    );
  });
});
