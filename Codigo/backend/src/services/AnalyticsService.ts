import Database from "../modules/Database";
import { Grades } from "../modules/Grade";
import { Stages } from "../modules/Stage";
import { AccessView } from "../views/AccessView";
import { AnalyticsPost, AnalyticsRaw, AnalyticsView, processAnalytics, states } from "../views/AnalyticsView";
import { Gender } from "../views/PatientView";
import { TablesNames } from "../views/QueryBuildView";
import GenericService from "./GenericService";

const service = new GenericService();

class AnalyticsService {
    private execute = Database.executeQuery;
    private analysisData: AnalyticsView[] = null;

    async init() {
        this.analysisData = await this.getAnalysisData();
        return this;
    }

    async addData(access: AccessView, data: AnalyticsPost) {
        try {
            return await service.create(access, TablesNames.ANALYTICS, data);
        } catch (error) {
            throw error;
        }
    }

    getReportPerState() {
        if (!this.analysisData) {
            throw "Must call init() before.";
        }

        return states.reduce((acc, state) => {
            const stateData = this.filterByState(this.analysisData, state);
            acc[state] = {
                male: this.getAnalysis(this.filterByGender(stateData, Gender.MALE)),
                female: this.getAnalysis(this.filterByGender(stateData, Gender.FEMALE))
            };
            return acc;
        }, {} as any);
    }

    getReportPerGender() {
        if (!this.analysisData) {
            throw "Must call init() before.";
        }

        const genders = [Gender.MALE, Gender.FEMALE];

        return genders.reduce((acc, gender) => {
            const genderData = this.filterByGender(this.analysisData, gender);
            acc[gender] = this.getAnalysis(genderData);
            return acc;
        }, {} as any);
    }

    private getAnalysis(data: AnalyticsView[]) {
        const counted = data.reduce((acc, cur) => {
            switch (cur.grade) {
                case Grades.A:
                    acc.grade.a++;
                    break;
                case Grades.B:
                    acc.grade.b++;
                    break;
                case Grades.C:
                    acc.grade.c++;
                    break;
            }

            switch (cur.stage) {
                case Stages.I:
                    acc.stage.i++;
                    break;
                case Stages.II:
                    acc.stage.ii++;
                    break;
                case Stages.III:
                    acc.stage.iii++;
                    break;
                case Stages.IV:
                    acc.stage.iv++;
                    break;
            }
            return acc;
        }, { grade: { a: 0, b: 0, c: 0 }, stage: { i: 0, ii: 0, iii: 0, iv: 0 } });

        const totals = {
            grade: counted.grade.a + counted.grade.b + counted.grade.c,
            stage: counted.stage.i + counted.stage.ii + counted.stage.iii + counted.stage.iv
        }

        return {
            count: counted,
            total: totals,
            percentages: {
                grade: {
                    a: (counted.grade.a / totals.grade) * 100,
                    b: (counted.grade.b / totals.grade) * 100,
                    c: (counted.grade.c / totals.grade) * 100,
                },
                stage: {
                    i: (counted.stage.i / totals.stage) * 100,
                    ii: (counted.stage.ii / totals.stage) * 100,
                    iii: (counted.stage.iii / totals.stage) * 100,
                    iv: (counted.stage.iv / totals.stage) * 100,
                }
            }
        }

    }

    private filterByState(data: AnalyticsView[], state: string): AnalyticsView[] {
        return data.filter(d => {
            return d.state === state;
        });
    }

    private filterByCountry(data: AnalyticsView[], country: string): AnalyticsView[] {
        return data.filter(d => {
            return d.country === country;
        });
    }

    private filterByGender(data: AnalyticsView[], gender: Gender): AnalyticsView[] {
        return data.filter(d => {
            return d.patientGender === gender;
        });
    }

    private filterByAge(data: AnalyticsView[], age: number): AnalyticsView[] {
        return data.filter(d => {
            return d.patientAge === age;
        });
    }

    private async getAnalysisData(): Promise<AnalyticsView[]> {
        const raw = await this.execute<AnalyticsRaw[]>(`SELECT * FROM Analytics`);
        return raw.map(r => processAnalytics(r));
    }
}

export default AnalyticsService;
