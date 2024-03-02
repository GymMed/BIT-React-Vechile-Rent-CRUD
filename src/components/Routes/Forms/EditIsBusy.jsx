import { useEffect, useState } from "react";
import InputWithStatus from "../../General/InputWithStatus";
import { validateMinValue } from "../../../utils/validator";
import { useMount } from "../../General/Hooks/useMount";
import { STATUSES_ENUM } from "../../../utils/enums/statusesManager";

export default function EditIsBusy({ notifyOnEdit, validateFormListener }) {
    const [ride, setRide] = useState(0);
    const [formValidationTrigger, setFormValidationTrigger] = useState(false);
    const isMounted = useMount();

    //information about inputs and statuses
    const inputs = {
        ride: {},
    };

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
        if (!isMounted) triggerFormValidation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validateFormListener]);

    useEffect(() => {
        if (!isMounted) checkForErrorInInputs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValidationTrigger]);

    return (
        <div>
            <InputWithStatus
                labelText="Rode Kilometers In Session"
                id="ride"
                name="ride"
                type="number"
                value={ride}
                onValidate={(value) => {
                    setRide(value);
                    const validationResult = validateMinValue(value, 0);
                    inputs.ride = { ...validationResult, value };
                    return validationResult;
                }}
                triggerValidation={formValidationTrigger}
            />
        </div>
    );
}
