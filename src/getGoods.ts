// npx ts-node getGoods.ts
import IGoodApp from "@/interfaces/IGoodApp";

const ADDRESS_GOODS : string = 'https://fakestoreapi.com/products';
const ERROR_MESSAGE = 'Не удалось загрузить товары с базы данных!';

const addLikeBnActive = (arr: IGoodApp[]): void => {
    arr.forEach((el: IGoodApp) => Object.assign(el, {isLikeBnActive: false}));
}

export default async function getDataGoods(): Promise<IGoodApp[] | []> {
    let result: IGoodApp[] | [] = [];

    await fetch(ADDRESS_GOODS)
        .then((res: Response) => res.json())
        .then((res: IGoodApp[]) => (result = res))
        .catch((err: Error) => {
            alert(ERROR_MESSAGE);
            console.log(err);
        });

    if (result.length) {
        addLikeBnActive(result);
    }

    return result;
}