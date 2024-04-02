import { UsersProperties } from "../views/UsersView";
import { RequestException } from '../views/RequestExceptionView';
import { AppointmentProperties } from "../views/AppointmenView";
import { PatientProperties } from "../views/PatientView";
import { AddressProperties } from "../views/AddressView";
import { analyticsProperties } from "../views/AnalyticsView";

const viewProperties: any = {
    Addresses: AddressProperties(),
    Appointments: AppointmentProperties(),
    Analytics: analyticsProperties(),
    Users: UsersProperties(),
    Patients: PatientProperties()
}

export function filterObject(viewName: string, receivedProperties: any) {
    const view = viewProperties[viewName];
    let params = receivedProperties;

    if (!view) {
        throw { status: 404, message: "Rota não existe" } as RequestException;
    }

    const possibleParams = [...view.required, ...view.optional];
    for (const key in receivedProperties) {
        if (!possibleParams.includes(key)) {
            delete params[key];
        }
    }

    return params;
}

export function verifyIntegrity(viewName: string, receivedProperties: any): boolean {
    const view = viewProperties[viewName];

    if (!view) {
        return false;
    }

    let requiredCounter = 0;
    let optionalCounter = 0;
    for (const key in receivedProperties) {
        if (view.required.indexOf(key) > -1) {
            requiredCounter++;
            continue;
        }

        if (view.optional.indexOf(key) > -1) {
            optionalCounter++;
        }
    }

    if (
        requiredCounter !== view.required.length ||
        (requiredCounter + optionalCounter) !== Object.keys(receivedProperties).length
    ) {
        return false;
    }

    return true;
}

export function escape(string: any): string {
    if (typeof string !== "string") {
        return string;
    }
    string = string.replace('"', '\\"');
    string = string.replace("\'", "\\'");
    string = string.replace('`', '\\`');
    return string;
}
