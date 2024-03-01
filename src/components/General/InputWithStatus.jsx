import { useEffect, useState } from "react";
import { STATUSES_ENUM } from "../../utils/enums/statusesManager";
import { useMount } from "./Hooks/useMount";
import Input from "./Input";

function getClassesBasedOnStatus(status) {
    switch (status) {
        case STATUSES_ENUM.Success:
            return "text-green-500";
        case STATUSES_ENUM.Warning:
            return "text-yellow-500";
        case STATUSES_ENUM.Information:
            return "text-blue-500";
        case STATUSES_ENUM.Error:
        default:
            return "text-red-500";
    }
}

function InputWithStatus({
    labelText,
    id,
    name,
    type = "text",
    value,
    onValidate = () => {},
    triggerValidation = null,
}) {
    const [input, setInput] = useState({
        status: -1,
        statusText: "",
        value: "",
    });

    const isMounted = useMount();

    useEffect(() => {
        const validateInput = async () => {
            if (!isMounted) {
                validateWithStatusResult(onValidate(input.value), input.value);
            }
        };

        validateInput();
    }, [triggerValidation]);

    function validateWithStatusResult(inputInfo, value) {
        if (
            typeof inputInfo === "object" &&
            Object.prototype.hasOwnProperty.call(inputInfo, "status") &&
            Object.prototype.hasOwnProperty.call(inputInfo, "statusText")
        )
            return setInput({ ...inputInfo, value });
    }

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name} className="font-semibold ">
                {labelText}
            </label>
            <Input
                id={id}
                name={name}
                type={type}
                value={value}
                status={input.status}
                onInput={(value) =>
                    validateWithStatusResult(onValidate(value), value)
                }
            />
            <div
                className={
                    (input.statusText ? "" : "hidden ") +
                    getClassesBasedOnStatus(input.status)
                }
            >
                {input.statusText}
            </div>
        </div>
    );
}

export default InputWithStatus;
