import { useEffect, useState } from "react"
import api from "../api/axios"

export default function Home() {
    const [restaurants, setRestaurants] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchRestaurants()
    }, [])

    const fetchRestaurants = async () => {
        setIsLoading(true)
        setError("")
        try {
            const res = await api.get("/restaurants")
            const payload = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data?.data)
                    ? res.data.data
                    : []
            setRestaurants(payload)
        } catch (err) {
            setError("Failed to load restaurants. Please try again.")
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">All Restaurants</h1>

            {isLoading && <p>Loading...</p>}
            {!isLoading && error && <p className="text-red-600">{error}</p>}

            {!isLoading && !error && restaurants.length === 0 && (
                <p>No restaurants found.</p>
            )}

            {!isLoading && !error && restaurants.length > 0 && (
                <div className="grid grid-cols-4 gap-6">
                    {restaurants.map((item) => {
                        const imageUrl = item?.photos?.[0] || item?.photo || ""
                        const priceRange = Number.isFinite(item?.priceRange)
                            ? item.priceRange
                            : 0

                        return (
                            <div key={item.id} className="border rounded-lg p-4 shadow">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={item?.name || "Restaurant"}
                                        className="h-40 w-full object-cover rounded"
                                    />
                                ) : (
                                    <div className="h-40 w-full rounded bg-gray-200" />
                                )}
                                <h2 className="font-semibold mt-3">{item?.name}</h2>
                                <p>Rating: {item?.rating ?? "-"}</p>
                                <p>Price: {priceRange > 0 ? "$".repeat(priceRange) : "-"}</p>
                                <p>{item?.isOpen ? "Open" : "Closed"}</p>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
