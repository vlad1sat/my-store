import {setToStorage} from "@/logicStorage/ActionsWithStorage";
import getDataGoods from "@/apiLogic/GetGoods";
import IGoodApp from "@/interfaces/IGoodApp";
import {LocalStorage} from "@/constApp/LocalStorage";

export async function goodsApiStorage(): Promise<void> {
    let goods: IGoodApp[] = [];

    await getDataGoods().then((res: IGoodApp[]) => goods = res);
    setToStorage(LocalStorage.Goods, goods);
}

