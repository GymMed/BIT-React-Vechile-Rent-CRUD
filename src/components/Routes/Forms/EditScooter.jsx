import InputWithStatus from "../../General/InputWithStatus";
import {
    validateSymbols,
    validateValue,
    validateRegex,
    validateMinValue,
    validateEmptyValue,
} from "../../../utils/validator";
import { STATUSES_ENUM } from "../../../utils/enums/statusesManager";
import { useEffect, useState } from "react";
import { useMount } from "../../General/Hooks/useMount";
import { formatDateToInput } from "../../../utils/formater";

function EditScooter({ notifyOnEdit, scooter, validateFormListener }) {
    const [newName, setNewName] = useState(scooter.title || "");
    const [newRegistrationCode, setNewRegistrationCode] = useState(
        scooter.registrationCode || ""
    );
    const [newHourlyPrice, setNewHourlyPrice] = useState(
        scooter.hourlyPrice || 0
    );
    const [newLastUseTime, setNewLastUseTime] = useState(
        scooter.lastUseTime || ""
    );
    const [newTotalRideKilometers, setNewTotalRideKilometers] = useState(
        scooter.totalRideKilometers || 0
    );
    const [newIsBusy, setNewIsBusy] = useState(scooter.isBusy || false);

    //information about inputs and statuses
    const inputs = {
        name: {},
        registrationCode: {},
        hourlyPrice: {},
        lastUseTime: {},
        totalRideKilometers: {},
        isBusy: {},
    };

    const [formValidationTrigger, setFormValidationTrigger] = useState(false);
    const isMounted = useMount();

    function triggerFormValidation() {
        setFormValidationTrigger(!formValidationTrigger);
    }

    function checkForErrorInInputs() {
        if (!isMounted) {
            for (const inputKey in inputs) {
                if (
                    !Object.prototype.hasOwnProperty.call(
                        inputs[inputKey],
                        "status"
                    ) ||
                    inputs[inputKey].status === STATUSES_ENUM.Error
                ) {
                    return;
                }
            }
            notifyOnEdit(inputs);
        }
    }

    useEffect(() => {
        triggerFormValidation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validateFormListener]);

    useEffect(() => {
        checkForErrorInInputs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValidationTrigger]);

    useEffect(() => {
        setNewName(scooter.title);
        setNewRegistrationCode(scooter.registrationCode);
        setNewHourlyPrice(scooter.hourlyPrice);
        setNewTotalRideKilometers(scooter.ride);
        setNewLastUseTime(scooter.lastUseTime);
        setNewIsBusy(scooter.isBusy);
    }, [scooter]);

    return (
        <div className="flex justify-center flex-wrap gap-3 w-full">
            <InputWithStatus
                labelText="Name"
                id="name"
                name="name"
                type="text"
                value={newName}
                onValidate={(value) => {
                    setNewName(value);
                    const validationResult = validateSymbols(value, 2, 12);
                    inputs.name = { ...validationResult, value };
                    return validationResult;
                }}
                triggerValidation={formValidationTrigger}
            />
            <InputWithStatus
                labelText="Registration Code"
                id="registrationCode"
                name="registrationCode"
                type="text"
                value={newRegistrationCode}
                onValidate={(value) => {
                    setNewRegistrationCode(value);
                    const validationResult = validateRegex(
                        /[A-Z]{3}[\d]{2}/,
                        value
                    );
                    inputs.registrationCode = { ...validationResult, value };
                    return validationResult;
                }}
                triggerValidation={formValidationTrigger}
            />
            <InputWithStatus
                labelText="Hourly Price"
                id="hourlyPrice"
                name="hourlyPrice"
                type="number"
                value={newHourlyPrice}
                onValidate={(value) => {
                    setNewHourlyPrice(value);
                    const validationResult = validateValue(value, 0, 100);
                    inputs.hourlyPrice = { ...validationResult, value };
                    return validationResult;
                }}
                triggerValidation={formValidationTrigger}
            />
            <InputWithStatus
                labelText="Last Use Time"
                id="lastUseTime"
                name="lastUseTime"
                type="datetime-local"
                value={
                    newLastUseTime &&
                    formatDateToInput(new Date(newLastUseTime))
                }
                onValidate={(value) => {
                    setNewLastUseTime(value);
                    const validationResult = validateEmptyValue(value);

                    if (validationResult.status !== STATUSES_ENUM.Success)
                        return { ...validationResult, value };

                    const timestamp = new Date(value).getTime();
                    inputs.lastUseTime = {
                        status: STATUSES_ENUM.Success,
                        statusText: ``,
                        value: timestamp,
                    };
                    return inputs.lastUseTime;
                }}
                triggerValidation={formValidationTrigger}
            />
            <InputWithStatus
                labelText="Total Ride Kilometers"
                id="totalRideKilometers"
                name="totalRideKilometers"
                type="number"
                value={newTotalRideKilometers}
                onValidate={(value) => {
                    setNewTotalRideKilometers(value);
                    const validationResult = validateMinValue(value, 0);
                    inputs.totalRideKilometers = { ...validationResult, value };
                    return validationResult;
                }}
                triggerValidation={formValidationTrigger}
            />
            <InputWithStatus
                labelText="Is Busy"
                id="isBusy"
                name="isBusy"
                type="checkbox"
                value={newIsBusy}
                onValidate={(value) => {
                    setNewIsBusy(value);
                    inputs.isBusy = {
                        status: STATUSES_ENUM.Success,
                        statusText: ``,
                        value,
                    };
                    return inputs.isBusy;
                }}
                triggerValidation={formValidationTrigger}
            />
        </div>
    );
}

export default EditScooter;
