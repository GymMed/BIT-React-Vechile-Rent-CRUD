import InputWithStatus from "../../General/InputWithStatus";
import {
    validateSymbols,
    validateValue,
    validateRegex,
    validateMinValue,
    validateEmptyValue,
} from "../../../utils/validator";
import { STATUSES_ENUM } from "../../../utils/enums/statusesManager";
import Button from "../../General/Button";
import { useEffect, useState } from "react";
import { useMount } from "../../General/Hookse/useMount";

function AddScooter({ notifyOnAdd }) {
    const [name, setName] = useState("");
    const [registrationCode, setRegistrationCode] = useState("");
    const [hourlyPrice, setHourlyPrice] = useState(0);
    const [lastUseTime, setLastUseTime] = useState();
    const [totalRideKilometers, setTotalRideKilometers] = useState(0);
    const [isBusy, setIsBusy] = useState(false);

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

    useEffect(() => {
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
            notifyOnAdd(inputs);
        }
    }, [formValidationTrigger]);

    return (
        <div className="flex justify-center flex-wrap gap-3 w-full">
            <InputWithStatus
                labelText="Name"
                id="name"
                name="name"
                type="text"
                value={name}
                onValidate={(value) => {
                    setName(value);
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
                value={registrationCode}
                onValidate={(value) => {
                    setRegistrationCode(value);
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
                value={hourlyPrice}
                onValidate={(value) => {
                    setHourlyPrice(value);
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
                value={lastUseTime}
                onValidate={(value) => {
                    setLastUseTime(value);
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
                value={totalRideKilometers}
                onValidate={(value) => {
                    setTotalRideKilometers(value);
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
                value={isBusy}
                onValidate={(value) => {
                    setIsBusy(value);
                    inputs.isBusy = {
                        status: STATUSES_ENUM.Success,
                        statusText: ``,
                        value,
                    };
                    return inputs.isBusy;
                }}
                triggerValidation={formValidationTrigger}
            />
            <div className="flex justify-center items-center">
                <Button
                    text="Add"
                    status={STATUSES_ENUM.Success}
                    onClick={() => {
                        triggerFormValidation();
                    }}
                />
            </div>
        </div>
    );
}

export default AddScooter;
