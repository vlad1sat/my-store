const PIXEL: string = 'px';

const pageMoveElement = (element: HTMLDivElement): void => {
    const moveElement = (e: MouseEvent): void => {
        const getStyleSmile = (sizePage: number, sizeSmile: number): string => sizePage - sizeSmile / 2 + PIXEL;

        const allSizeElement: DOMRect = element.getBoundingClientRect();
        element.style.left = getStyleSmile(e.pageX, allSizeElement.width);
        element.style.top = getStyleSmile(e.pageY, allSizeElement.height);
    };

    document.addEventListener('mousemove' , moveElement);

    element.addEventListener('mouseup', (): void => {
        document.removeEventListener('mousemove', moveElement);
    });

    element.ondragstart = (): boolean => false;
};

const startPosition = (element: HTMLDivElement, startWidth: number, startHeight: number): void => {
    const elStyle: CSSStyleDeclaration = element.style;
    elStyle.left = startWidth + PIXEL;
    elStyle.top = startHeight + PIXEL;
}

export {pageMoveElement, startPosition};