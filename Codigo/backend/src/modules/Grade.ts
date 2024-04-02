export enum Grades {
    A = "A",
    B = "B",
    C = "C"
}

export class Grade {

    smoking: Smoking;
    hemoglobineGlycated: HemoglobineGlycated;
    lossHistoricalInFiveYears: number;
    boneLossPercentagePerAge: number;

    constructor(smoking: Smoking, hemoglobineGlycated: HemoglobineGlycated, lossHistoricalInFiveYears: number, boneLossPercentagePerAge: number) {
        this.smoking = smoking;
        this.hemoglobineGlycated = hemoglobineGlycated;
        this.lossHistoricalInFiveYears = lossHistoricalInFiveYears;
        this.boneLossPercentagePerAge = boneLossPercentagePerAge;
    }

    defineGrade(): Grades {
        const response = [Grades.A, Grades.B, Grades.C];
        const array: number[] = [];

        array.push(this.smokingGrade());
        array.push(this.hemoglobineGlycatedGrade());
        array.push(this.lossHistoricalInFiveYearsGrade());
        array.push(this.boneLossPercentagePerAgeGrade());

        const grade = Math.max(...array);
        return response[grade - 1];
    }

    smokingGrade(): number {
        switch (this.smoking) {
            default:
            case Smoking.NO_SMOKER:
                return 1;
            case Smoking.LESS_THAN_TEN:
                return 2;
            case Smoking.TEN_OR_MORE:
                return 3;
        }
    }

    hemoglobineGlycatedGrade(): number {
        switch (this.hemoglobineGlycated) {
            default:
            case HemoglobineGlycated.NO_DIABETIC:
                return 1;
            case HemoglobineGlycated.LESS_THAN_SEVEN:
                return 2;
            case HemoglobineGlycated.SEVEN_OR_MORE:
                return 3;
        }
    }

    lossHistoricalInFiveYearsGrade(): number {

        if (this.lossHistoricalInFiveYears > 0 && this.lossHistoricalInFiveYears < 2) {
            return 2;
        } else if (this.lossHistoricalInFiveYears >= 2) {
            return 3;
        }
        return 1;
    }

    boneLossPercentagePerAgeGrade(): number {

        const calcBonusLossPercentAge = this.boneLossPercentagePerAge;

        switch (true) {
            default:
            case (calcBonusLossPercentAge < 0.25):
                return 1;
            case (calcBonusLossPercentAge >= 0.25 && calcBonusLossPercentAge <= 1):
                return 2;
            case (calcBonusLossPercentAge > 1):
                return 3;
        }
    }
}

export enum Smoking {
    NO_SMOKER = '0',
    LESS_THAN_TEN = '<10',
    TEN_OR_MORE = '>=10'
}

export enum HemoglobineGlycated {
    NO_DIABETIC = '0',
    LESS_THAN_SEVEN = '<7%',
    SEVEN_OR_MORE = '>=7%'
}