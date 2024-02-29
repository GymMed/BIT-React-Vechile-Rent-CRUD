import { STATUSES_ENUM } from "../../utils/enums/statusesManager.jsx";

function getClassesBasedOnStatus(status) {
    switch (status) {
        case STATUSES_ENUM.Success:
            return "from-green-500 to-green-700 hover:from-green-700 hover:to-green-900 focus:ring-green-700";
        case STATUSES_ENUM.Warning:
            return "from-yellow-500 to-yellow-700 hover:from-yellow-700 hover:to-yellow-900 focus:ring-yellow-700";
        case STATUSES_ENUM.Information:
            return "from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 focus:ring-blue-700";
        case STATUSES_ENUM.Error:
        default:
            return "from-red-500 to-red-700 hover:from-red-700 hover:to-red-900 focus:ring-red-700";
    }
}

export default function IconButton({ icon, onClick, status }) {
    return (
        <button
            type="button"
            className={
                getClassesBasedOnStatus(status) +
                " rounded bg-gradient-to-br focus:ring focus:ring-offset-2"
            }
            onClick={onClick}
        >
            <div className="p-2 hover:scale-125 text-white">{icon}</div>
        </button>
    );
}
