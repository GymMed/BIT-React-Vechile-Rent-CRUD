import { useEffect, useMemo, useState } from "react";
import Header from "../Header/Header";
import Scooter from "../General/Scooter";
import AddScooter from "./Forms/AddScooter";
import ScooterStatusFilter from "../General/Filters/ScooterStatusFilter";
import { SCOOTERS_FILTER_ENUM } from "../../utils/enums/scooterFilterEnum";
import SubmitModal from "../General/Modals/SubmitModal";
import EditScooter from "./Forms/EditScooter";
import EditIsBusy from "./Forms/EditIsBusy";

const AppName = "Gymmed";

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
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingScooter, setEditingScooter] = useState({});

    const [showIsBusyModal, setShowIsBusyModal] = useState(false);

    const [validateEditForm, setValidateEditForm] = useState(false);
    const [validateIsBusyForm, setValidateIsBusyForm] = useState(false);

    const filteredScooters = useMemo(() => {
        return scooters.filter((scooter) => {
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

    //original fetch
    // async function getAllScooters() {
    //     const fetchedScooters = await getScooters();
    //     localStorage.setItem("scooters", JSON.stringify(fetchedScooters));
    //     console.log(fetchedScooters);
    //     setScooters(fetchedScooters);
    // }

    //enables local storage currently for testing reasons turned off
    useEffect(() => {
        localStorage.setItem("scooters", JSON.stringify(scooters));
    }, [scooters]);

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
    }

    function startEditingScooter(id) {
        const foundScooter = scooters.find((scooter) => scooter.id === id);

        if (!foundScooter) return;

        setEditingScooter(foundScooter);
        setShowEditModal(true);
    }

    function addScooter(data) {
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

    function editScooter(id, data) {
        const newEditScooter = {
            ...editingScooter,
            id: id,
            title: data.name.value,
            registrationCode: data.registrationCode.value,
            ride: data.totalRideKilometers.value,
            hourlyPrice: data.hourlyPrice.value,
            lastUseTime: data.lastUseTime.value,
            isBusy: data.isBusy.value,
        };

        setEditingScooter(newEditScooter);
        setScooters(
            scooters.map((scooter) => {
                if (scooter.id !== id) {
                    return scooter;
                }
                return newEditScooter;
            })
        );
    }

    function setIsBusy(scooterId, isBusyValue, addRide = 0) {
        setScooters((previousScooters) => {
            return previousScooters.map((scooter) => {
                if (scooter.id === scooterId) {
                    return {
                        ...scooter,
                        isBusy: isBusyValue,
                        ride: parseFloat(
                            parseFloat(scooter.ride) + parseFloat(addRide)
                        ).toFixed(2),
                    };
                }

                return scooter;
            });
        });
    }

    return (
        <div className="w-full">
            <SubmitModal
                isOpen={showEditModal}
                onCancel={() => setShowEditModal(false)}
                onOk={() => {
                    setValidateEditForm(!validateEditForm);
                }}
            >
                <EditScooter
                    notifyOnEdit={(inputs) => {
                        editScooter(editingScooter.id, inputs);
                        setShowEditModal(false);
                    }}
                    scooter={editingScooter}
                    validateFormListener={validateEditForm}
                />
            </SubmitModal>
            <SubmitModal
                isOpen={showIsBusyModal}
                onCancel={() => setShowIsBusyModal(false)}
                onOk={() => {
                    setValidateIsBusyForm(!validateIsBusyForm);
                }}
            >
                <EditIsBusy
                    notifyOnEdit={(inputs) => {
                        setIsBusy(
                            editingScooter.id,
                            !editingScooter.isBusy,
                            inputs.ride.value
                        );
                        setShowIsBusyModal(false);
                    }}
                    validateFormListener={validateIsBusyForm}
                />
            </SubmitModal>
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
                                setIsBusy={(value) => {
                                    if (value) {
                                        setIsBusy(scooter.id, value);
                                        return;
                                    }
                                    setEditingScooter(scooter);
                                    setShowIsBusyModal(true);
                                }}
                                lastUseTime={scooter.lastUseTime}
                                registrationCode={scooter.registrationCode}
                                ride={scooter.ride}
                                onRemove={() => removeScooter(scooter.id)}
                                onEdit={() => startEditingScooter(scooter.id)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
