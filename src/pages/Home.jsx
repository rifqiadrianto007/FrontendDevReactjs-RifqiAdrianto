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
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <h1 className="text-4xl font-semibold mb-3">
                    Restaurants
                </h1>
                <p className="text-gray-500 mb-8 max-w-2xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="border-t mb-6"></div>

                {/* Filter Bar */}
                <div className="flex items-center justify-between border-b pb-4 mb-10">
                    <div className="flex items-center gap-8 text-sm">
                        <span className="text-gray-500">Filter By:</span>
                        <label className="flex items-center gap-2 border-b pb-1 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showOpenOnly}
                                onChange={() => setShowOpenOnly(!showOpenOnly)}
                            />
                            Open Now
                        </label>

                        <select
                            value={selectedPrice}
                            onChange={(e) => setSelectedPrice(e.target.value)}
                            className="border-b pb-1 outline-none bg-transparent"
                        >
                            <option value="">Price</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                        </select>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border-b pb-1 outline-none bg-transparent"
                        >
                            <option value="">Categories</option>
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
                    <button
                        onClick={() => {
                            setShowOpenOnly(false)
                            setSelectedPrice("")
                            setSelectedCategory("")
                        }}
                        className="text-sm border px-4 py-1"
                    >
                        CLEAR ALL
                    </button>
                </div>

                {/* Content */}
                {isLoading && <p>Loading...</p>}
                {!isLoading && error && (
                    <p className="text-red-600">{error}</p>
                )}
                {!isLoading && !error && filteredRestaurants.length === 0 && (
                    <p>No restaurants found.</p>
                )}
                {!isLoading && !error && filteredRestaurants.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {filteredRestaurants.slice(0, visibleCount).map((item) => (
                                <RestaurantCard key={item.id} item={item} />
                            ))}
                        </div>
                        {visibleCount < filteredRestaurants.length && (
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 4)}
                                    className="border px-8 py-2 text-sm"
                                >
                                    LOAD MORE
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
