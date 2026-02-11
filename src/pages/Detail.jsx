import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api/axios"

export default function Detail() {
    const { id } = useParams()
    const [restaurant, setRestaurant] = useState(null)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetchDetail()
    }, [id])

    const fetchDetail = async () => {
        try {
            const res = await api.get(`/restaurants/${id}`)
            setRestaurant(res.data)

            const reviewRes = await api.get("/reviews")
            const filteredReviews = reviewRes.data.filter(
                (rev) => String(rev.restaurantId) === String(id)
            )
            setReviews(filteredReviews)
        } catch (err) {
            console.log(err)
        }
    }

    if (!restaurant) return <p className="p-8">Loading...</p>

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header */}
                <div className="bg-white rounded-xl shadow p-6 mb-8">
                    <div className="grid md:grid-cols-2 gap-6 items-center">

                        <img
                            src={restaurant.photos?.[0]}
                            alt={restaurant.name}
                            className="w-full h-72 object-cover rounded-lg"
                        />

                        <div>
                            <h1 className="text-3xl font-bold mb-3">
                                {restaurant.name}
                            </h1>

                            <p className="text-lg mb-2">
                                Rating: {restaurant.rating}
                            </p>

                            <p className="mb-2">
                                Price: {"$".repeat(restaurant.priceRange)}
                            </p>

                            <p className={restaurant.isOpen ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                {restaurant.isOpen ? "Open Now" : "Closed"}
                            </p>

                            <p className="mt-4 text-gray-600">
                                {restaurant.description}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Reviews Section */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6">
                        Customer Reviews
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {reviews.map((rev) => (
                            <div key={rev.id} className="bg-white rounded-xl shadow p-5">

                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={rev.image}
                                        alt={rev.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="font-semibold">
                                            {rev.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Rating: {rev.rating}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-700">
                                    {rev.text}
                                </p>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
