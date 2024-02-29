import { formatDateString } from "../../utils/formater.jsx";
import { STATUSES_ENUM } from "../../utils/enums/statusesManager.jsx";
import EditSvg from "../../assets/icons/Edit.svg?react";
import RemoveSvg from "../../assets/icons/Remove.svg?react";
import IconButton from "./IconButton";

function status(active, onClick) {
    const activityClasses = active
        ? "from-red-400 to-red-700 hover:from-red-600 hover:to-red-800"
        : "from-green-400 to-green-700 hover:from-green-600 hover:to-green-800";
    return (
        <button
            type="button"
            className={
                activityClasses + ` bg-gradient-to-br rounded-full w-6 h-6`
            }
            onClick={() => {
                const setActivity = (active = !active);
                onClick(setActivity);
            }}
        ></button>
    );
}

export default function Scooter({
    hourlyPrice,
    isBusy,
    setIsBusy,
    lastUseTime,
    registrationCode,
    ride,
    title,
    onEdit,
    onRemove,
}) {
    return (
        <div className="rounded bg flex flex-wrap gap-3 justify-between p-2 shadow-lg bg-gradient-to-br from-accent-300 to-accent-500">
            <div>
                <div className="font-bold">{title}</div>
                <div>Mileage: {ride} km</div>
            </div>
            <div>
                <div>
                    Registration code:
                    <span className="font-bold">{registrationCode}</span>
                </div>
                <div>
                    Hourly price: {parseFloat(hourlyPrice).toFixed(2)} &euro;
                </div>
            </div>
            <div>
                <div>
                    Last use time: {formatDateString(new Date(lastUseTime))}
                </div>
                <div className="flex justify-between items-center">
                    <div>Status:</div>
                    <div>{status(isBusy, setIsBusy)}</div>
                </div>
            </div>
            <div className="flex justify-center items-center gap-3">
                <div>
                    <IconButton
                        icon={<EditSvg />}
                        onClick={() => {
                            onEdit();
                        }}
                        status={STATUSES_ENUM.Success}
                    />
                </div>
                <div>
                    <IconButton
                        icon={<RemoveSvg />}
                        onClick={() => {
                            onRemove();
                        }}
                        status={STATUSES_ENUM.Error}
                    />
                </div>
            </div>
        </div>
    );
}
