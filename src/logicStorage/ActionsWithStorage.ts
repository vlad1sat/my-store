const setToStorage = (nameElement: string, elementStorage: any): void => {
    localStorage.setItem(nameElement, JSON.stringify(elementStorage));
};

const getToStorage = (nameElement: string) : any[] => {
    const resultStorage: string | null = localStorage.getItem(nameElement);

    if (resultStorage !== null) {
        return JSON.parse(resultStorage);
    }

    return [];
};

export { setToStorage, getToStorage };
