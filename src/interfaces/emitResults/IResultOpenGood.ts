import IGoodApp from "@/interfaces/IGoodApp";

export default interface IResultOpenGood {
    selectedGood: IGoodApp,
    stateGood: {
        isShowSort: boolean,
        isShowGood: boolean
    }
};