import { useEffect, useState } from "react"
import api from "../api/axios"
import RestaurantCard from "../components/RestaurantCard"

export default function Home() {
    const [restaurants, setRestaurants] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [showOpenOnly, setShowOpenOnly] = useState(false)
    const [selectedPrice, setSelectedPrice] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [visibleCount, setVisibleCount] = useState(8)

    useEffect(() => {
        setVisibleCount(8)
        fetchRestaurants()
    }, [selectedCategory])

    const fetchRestaurants = async () => {
        setIsLoading(true)
        setError("")
        try {
            let endpoint = "/restaurants"

            if (selectedCategory) {
                endpoint += `?search=${selectedCategory}`
            }

            const res = await api.get(endpoint)

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

    const filteredRestaurants = restaurants
        .filter(r => showOpenOnly ? r.isOpen : true)
        .filter(r => selectedPrice ? String(r.priceRange) === selectedPrice : true)

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-3xl font-bold mb-8">
                    All Restaurants
                </h1>
                <div className="flex items-center gap-6 mb-8 flex-wrap">

                    {/* Open Now */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showOpenOnly}
                            onChange={() => setShowOpenOnly(!showOpenOnly)}
                            className="w-4 h-4"
                        />
                        <span>Open Now</span>
                    </label>

                    {/* Price Filter */}
                    <select
                        value={selectedPrice}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="border rounded px-3 py-2"
                    >
                        <option value="">All Prices</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                    </select>

                    {/* Category Filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border rounded px-3 py-2"
                    >
                        <option value="">All Categories</option>
                        <option value="Javanese">Javanese</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Italian">Italian</option>
                        <option value="Korean">Korean</option>
                        <option value="Thai">Thai</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Indonesian">Indonesian</option>
                        <option value="American">American</option>
                        <option value="Vietnamese">Vietnamese</option>
                        <option value="Indian">Indian</option>
                        <option value="Mediterranean">Mediterranean</option>
                        <option value="French">French</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Healthy">Healthy</option>
                        <option value="Seafood">Seafood</option>
                    </select>

                </div>
                {isLoading && <p>Loading...</p>}
                {!isLoading && error && (
                    <p className="text-red-600">{error}</p>
                )}
                {!isLoading && !error && restaurants.length === 0 && (
                    <p>No restaurants found.</p>
                )}
                {!isLoading && !error && filteredRestaurants.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredRestaurants.slice(0, visibleCount).map((item) => (
                                <RestaurantCard key={item.id} item={item} />
                            ))}
                        </div>

                        {visibleCount < filteredRestaurants.length && (
                            <div className="flex justify-center mt-10">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 4)}
                                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
