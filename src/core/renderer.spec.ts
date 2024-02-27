import { loadAndDisplayHTML } from './renderer';

describe('loadAndDisplayHTML', () => {
    // Mock container
    const mockContainer = document.createElement('div');

    beforeEach(() => {
        mockContainer.innerHTML = '';
        jest.spyOn(document, 'querySelector').mockReturnValue(mockContainer);
        jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('injects HTML content into the container with replaced props', async () => {
        const containerSelector = '#test-container';
        const htmlContent = '<div>${name}</div>';
        const props = { name: 'Test Name' };

        await loadAndDisplayHTML(containerSelector, htmlContent, props);

        expect(document.querySelector).toHaveBeenCalledWith(containerSelector);
        expect(mockContainer.innerHTML).toBe('<div>Test Name</div>');
        expect(console.error).not.toHaveBeenCalled();
    });

    test('logs an error when container is not found', async () => {
        jest.spyOn(document, 'querySelector').mockReturnValueOnce(null);
        const containerSelector = '#missing-container';
        const htmlContent = '<div>Content</div>';
        const props = {};

        await loadAndDisplayHTML(containerSelector, htmlContent, props);

        expect(document.querySelector).toHaveBeenCalledWith(containerSelector);
        expect(console.error).toHaveBeenCalledWith("Container not found:", containerSelector);
    });
});
