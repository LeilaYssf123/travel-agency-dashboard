import Header from "../../../Componenets/Header";
import React from "react";


const Trips = () => {
    return (
        <main className="all-users wrapper  flex flex-col justify-start items-center min-h-screen ml-[250px]">
            <Header
                title="Trips"
                description=" View and edit AI-generated travel plans "
                ctaText="Create a trip"
                ctaUrl="/trips/create"
            />
        </main>
    )
}
export default Trips

