import { useMemo, useState } from "react";
import Header from "../Header/Header";
import Scooter from "../General/Scooter";
import AddScooter from "./Forms/AddScooter";
import ScooterStatusFilter from "../General/filters/ScooterStatusFilter";
import { SCOOTERS_FILTER_ENUM } from "../../utils/enums/scooterFilterEnum";

const AppName = "Kolt";

// async function getScooters() {
//     const promise = await fetch("/scooters.json");
//     const result = await promise.json();

//     return result;
// }

export default function Root() {
    const [scooters, setScooters] = useState(setupScooters);
    const [showFreeScooters, setShowFreeScooters] = useState(
        SCOOTERS_FILTER_ENUM.All
    );

    const filteredScooters = useMemo(() => {
        return scooters.filter((scooter) => {
            console.log("filtering");

            switch (showFreeScooters) {
                case SCOOTERS_FILTER_ENUM.All:
                    return true;
                case SCOOTERS_FILTER_ENUM.IsFree:
                    return !scooter.isBusy;
                case SCOOTERS_FILTER_ENUM.IsBusy:
                    return scooter.isBusy;
                default:
                    return true;
            }
        });
    }, [showFreeScooters, scooters]);

    // async function getAllScooters() {
    //     const fetchedScooters = await getScooters();
    //     localStorage.setItem("scooters", JSON.stringify(fetchedScooters));
    //     console.log(fetchedScooters);
    //     setScooters(fetchedScooters);
    // }

    function setupScooters() {
        const data = JSON.parse(localStorage.getItem("scooters") || "[]");

        if (data.length < 1) localStorage.setItem("scooters", "[]");
        return data;
    }

    function removeScooter(id) {
        const filteredScooters = scooters.filter(
            (scooter) => scooter.id !== id
        );

        setScooters(filteredScooters);
        // localStorage.setItem("scooters", JSON.stringify(filteredScooters));
    }

    function editScooter(id) {
        const filteredScooters = scooters.filter(
            (scooter) => scooter.id !== id
        );
        console.log(filteredScooters, id);
    }

    function addScooter(data) {
        console.log("zdare", data, scooters);
        let currentId = localStorage.getItem("currentId") || 11;

        setScooters([
            {
                id: currentId,
                title: data.name.value,
                hourlyPrice: data.hourlyPrice.value,
                ride: data.totalRideKilometers.value,
                registrationCode: data.registrationCode.value,
                lastUseTime: data.lastUseTime.value,
                isBusy: data.isBusy.value,
            },
            ...scooters,
        ]);

        localStorage.setItem("currentId", currentId + 1);
    }

    function setIsBusy(scooterId, isBusyValue) {
        setScooters((previousScooters) => {
            return previousScooters.map((scooter) => {
                if (scooter.id === scooterId) {
                    return { ...scooter, isBusy: isBusyValue };
                }

                return scooter;
            });
        });
    }

    return (
        <div className="w-full">
            <Header AppName={AppName} />
            <div className="bg-primary-50 p-10 flex justify-center flex-col gap-3">
                <div className="flex flex-col justify-center items-center gap-10 bg-accent-100 rounded p-5">
                    <AddScooter notifyOnAdd={addScooter} />
                    <ScooterStatusFilter
                        setFilterStatus={setShowFreeScooters}
                    />
                </div>
                <div className="p-2 flex flex-col gap-3">
                    {filteredScooters.map((scooter, index) => {
                        return (
                            <Scooter
                                key={index}
                                title={scooter.title}
                                hourlyPrice={scooter.hourlyPrice}
                                isBusy={scooter.isBusy}
                                setIsBusy={(value) =>
                                    setIsBusy(scooter.id, value)
                                }
                                lastUseTime={scooter.lastUseTime}
                                registrationCode={scooter.registrationCode}
                                ride={scooter.ride}
                                onRemove={() => removeScooter(scooter.id)}
                                onEdit={() => editScooter(scooter.id)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
