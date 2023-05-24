import {ModalGoodText} from "@/constApp/BaseText";

export default interface IDataModalGood {
    imageRating: string,
    isNeedClose: boolean,
    readonly modalText: typeof ModalGoodText
};