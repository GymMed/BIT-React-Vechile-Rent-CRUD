import { STATUSES_ENUM } from "../../utils/enums/statusesManager";

function getClassesBasedOnStatus(status) {
    switch (status) {
        case STATUSES_ENUM.Success:
            return "border-green-500 focus:ring-green-500";
        case STATUSES_ENUM.Warning:
            return "border-yellow-500 focus:ring-yellow-500";
        case STATUSES_ENUM.Information:
            return "border-blue-500 focus:ring-blue-500";
        case STATUSES_ENUM.Error:
            return "border-red-500 focus:ring-red-500";
        default:
            return "border-accent-500 focus:ring-accent-500";
    }
}

export default function Input({
    type = "text",
    id,
    name,
    status,
    value,
    onInput = () => {},
}) {
    function getCheckboxValue() {
        if (type === "checkbox") {
            return value ?? "checked";
        }

        return "";
    }

    return (
        <input
            className={
                getClassesBasedOnStatus(status) +
                " p-2 border rounded focus:ring focus:ring-offset-2"
            }
            type={type}
            id={id}
            name={name}
            value={value}
            {...getCheckboxValue()}
            onInput={(event) => {
                onInput(
                    type !== "checkbox"
                        ? event.target.value
                        : event.target.checked
                );
            }}
        />
    );
}
