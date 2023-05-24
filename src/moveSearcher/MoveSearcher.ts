const PIXEL: string = 'px';

const pageMoveElement = (element: HTMLDivElement): void => {
    const moveElement = (e: MouseEvent): void => {
        const getStyleSmile = (sizePage: number, sizeSmile: number): string => sizePage - sizeSmile / 2 + PIXEL;

        const allSizeElement: DOMRect = element.getBoundingClientRect();
        console.log(window.scrollY)
        element.style.left = getStyleSmile(e.pageX, allSizeElement.width);
        element.style.top = getStyleSmile(e.pageY - window.scrollY, allSizeElement.height);
    };

    document.addEventListener('mousemove' , moveElement);

    element.addEventListener('mouseup', (): void => {
        document.removeEventListener('mousemove', moveElement);
    });

    element.ondragstart = (): boolean => false;
};

const startPosition = (element: HTMLDivElement, startLeft: number, startTop: number): void => {
    const elStyle: CSSStyleDeclaration = element.style;
    elStyle.left = startLeft + PIXEL;
    elStyle.top = startTop + PIXEL;
}

export {pageMoveElement, startPosition};