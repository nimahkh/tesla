export async function loadAndDisplayHTML(containerSelector: string, htmlContent: string, props: Record<string, string>) {
    const container = document.querySelector<HTMLDivElement>(containerSelector);
    if (!container) {
        console.error('Container not found:', containerSelector);
        return;
    }

    try {
        // Replace placeholders with actual content based on replacements object
        Object.keys(props).forEach(placeholder => {
            htmlContent = htmlContent.replace(new RegExp(`\\$\\{${placeholder}\\}`, 'g'), props[placeholder]);
        });

        // Set the innerHTML of the container
        container.innerHTML = htmlContent;

        // If additional setup is needed after loading HTML, consider calling it here or outside based on your design
        // For example, setupCounter could be called here if it's necessary for every use of this function
        // Or it could be called separately if its need varies
    } catch (error) {
        console.error('Failed to load HTML content:', error);
    }
}
