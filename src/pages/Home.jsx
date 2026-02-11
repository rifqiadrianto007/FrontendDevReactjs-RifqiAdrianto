import { useEffect, useState } from "react"
import api from "../api/axios"
import React from "react"
import RestaurantCard from "../components/RestaurantCard"

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {restaurants.map((item) => (
                        <RestaurantCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    )
}
