export async function loadAndDisplayHTML(
  containerSelector: string,
  htmlContent: string,
  props: Record<string, string>,
) {
  const container = document.querySelector<HTMLDivElement>(containerSelector);
  if (!container) {
    console.error("Container not found:", containerSelector);
    return;
  }

  try {
    Object.keys(props).forEach((placeholder) => {
      htmlContent = htmlContent.replace(
        new RegExp(`\\$\\{${placeholder}\\}`, "g"),
        props[placeholder],
      );
    });
    container.innerHTML = htmlContent;
  } catch (error) {
    console.error("Failed to load HTML content:", error);
  }
}
