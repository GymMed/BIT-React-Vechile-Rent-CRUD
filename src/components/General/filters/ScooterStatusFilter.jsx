import { STATUSES_ENUM } from "../../../utils/enums/statusesManager";
import { SCOOTERS_FILTER_ENUM } from "../../../utils/enums/scooterFilterEnum";
import Button from "../Button";

export default function ScooterStatusFilter({ setFilterStatus }) {
    return (
        <div className="flex gap-3">
            <Button
                text="Filter by Free"
                status={STATUSES_ENUM.Success}
                onClick={() => {
                    setFilterStatus(SCOOTERS_FILTER_ENUM.IsFree);
                }}
            />
            <Button
                text="Filter by Busy"
                status={STATUSES_ENUM.Error}
                onClick={() => {
                    setFilterStatus(SCOOTERS_FILTER_ENUM.IsBusy);
                }}
            />
            <Button
                text="Remove filters"
                status={STATUSES_ENUM.Information}
                onClick={() => {
                    setFilterStatus(SCOOTERS_FILTER_ENUM.All);
                }}
            />
        </div>
    );
}
