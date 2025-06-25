import { Header, StatsCard, TripCard } from "../../../Componenets";
import { dashboardStats, user, allTrips } from "~/constants";
import {getUser} from "~/appwrite/auth";
import type  {Route} from './+types/Dashboard';
const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;

const Dashboard = ({ loaderData }: Route.ComponentProps ) => {
    return (
        <main className="dashboard wrapper min-h-screen flex">
            <div className="w-full max-w-6xl mx-auto p-6 ml-32"> {/* Augmenté à ml-32 pour plus de décalage */}
                <Header
                    title={`Welcome ${user?.name ?? 'Guest'}👋`}
                    description="Track Activity , trends and popular destinations in real time  "
                />

                <section className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard
                            headerTitle="Total Users"
                            total={totalUsers}
                            currentMonthCount={usersJoined.currentMonth}
                            lastMonthCount={usersJoined.lastMonth}
                        />
                        <StatsCard
                            headerTitle="Total Trips"
                            total={totalTrips}
                            currentMonthCount={tripsCreated.currentMonth}
                            lastMonthCount={tripsCreated.lastMonth}
                        />
                        <StatsCard
                            headerTitle="Active Users Today"
                            total={userRole.total}
                            currentMonthCount={userRole.currentMonth}
                            lastMonthCount={userRole.lastMonth}
                        />
                    </div>
                </section>

                <section className="mt-6">
                    <h1 className="text-xl font-semibold text-gray-900 mb-6">Created Trips</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {allTrips.slice(0, 4).map(({ id, name, imageUrls, itinerary, tags, estimatedPrice }) => (
                            <TripCard
                                key={id}
                                id={id.toString()}
                                name={name}
                                imageUrl={imageUrls[0]}
                                location={itinerary?.[0]?.location ?? ''}
                                tags={tags}
                                price={estimatedPrice}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Dashboard;