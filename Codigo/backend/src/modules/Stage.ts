import { BoneLossType, Furcation } from "../views/AppointmenView";

export enum Stages {
    I = "I",
    II = "II",
    III = "III",
    IV = "IV",
}

export class Stage {

    toothLoss: number;
    interdentalCalLoss: number;
    boneLossPercentage: number;

    //Complexity
    maximumProbingDepth: number;
    boneLossType: string;
    boneLenght: number;
    boneLoss: number;
    furcation: Furcation;

    constructor(toothLoss: number, interdentalCalLoss: number, boneLoss: number, boneLenght: number, maximumProbingDepth: number, boneLossType: string, furcation: Furcation) {
        this.toothLoss = toothLoss;
        this.interdentalCalLoss = interdentalCalLoss;
        this.maximumProbingDepth = maximumProbingDepth;
        this.boneLossType = boneLossType;
        this.boneLoss = boneLoss;
        this.boneLenght = boneLenght;
        this.furcation = furcation;
    }

    defineStage(): Stages {
        const response = [Stages.I, Stages.II, Stages.III, Stages.IV];
        const array: number[] = [];

        array.push(this.toothLossStage());
        array.push(this.interdentalCalLossStage());
        array.push(this.boneLossPercentageStage());
        array.push(this.maximumProbingDepthStage());
        array.push(this.boneLossTypeStage());
        array.push(this.furcationStage());

        const grade = Math.max(...array);
        return response[grade - 1];
    }

    toothLossStage(): number {
        switch (true) {
            default:
            case this.toothLoss == 0:
                return 1;
            case this.toothLoss <= 4:
                return 3;
            case this.toothLoss >= 5:
                return 4;
        }
    }

    interdentalCalLossStage(): number {
        switch (true) {
            default:
            case (this.interdentalCalLoss >= 1 && this.interdentalCalLoss <= 2):
                return 1;
            case (this.interdentalCalLoss >= 3 && this.interdentalCalLoss <= 4):
                return 2;
            case (this.interdentalCalLoss >= 5):
                return 3;
        }
    }

    boneLossPercentageStage(): number {
        const percentage = (this.boneLoss / this.boneLenght) * 100;
        switch (true) {
            default:
            case (percentage < 15):
                return 1;
            case (percentage >= 15 && percentage <= 33):
                return 2;
            case (percentage > 33):
                return 3;
        }
    }

    maximumProbingDepthStage(): number {
        switch (true) {
            default:
            case (this.maximumProbingDepth <= 4):
                return 1;
            case (this.maximumProbingDepth <= 5):
                return 2;
            case (this.maximumProbingDepth >= 6):
                return 3;
        }
    }

    boneLossTypeStage(): number {
        switch (this.boneLossType) {
            default:
            case BoneLossType.HORIZONTAL_BONE_LOSS:
                return 1;
            case BoneLossType.VERTICAL_BONE_LOSS:
                return 3;
        }
    }

    furcationStage(): number {
        switch (this.furcation) {
            default:
            case Furcation.CLASS_1:
                return 1;
            case Furcation.CLASS_2:
            case Furcation.CLASS_3:
                return 3;
        }
    }
}
