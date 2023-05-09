export default interface IGoodApp {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    title: string,
    rating: {
        rate: number,
        count: number
    },
    isLikeBnActive?: boolean,
};