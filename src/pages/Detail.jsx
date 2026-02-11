import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axios"

export default function Detail() {
    const { id } = useParams()
    const [restaurant, setRestaurant] = useState(null)
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetchDetail()
    }, [id])

    const fetchDetail = async () => {
        setIsLoading(true)
        setError("")
        try {
            const [res, reviewRes] = await Promise.all([
                api.get(`/restaurants/${id}`),
                api.get("/reviews")
            ])
            setRestaurant(res.data || null)

            const reviewPayload = Array.isArray(reviewRes.data) ? reviewRes.data : []
            const filteredReviews = reviewPayload.filter(
                (rev) => String(rev.restaurantId) === String(id)
            )
            setReviews(filteredReviews)
        } catch (err) {
            setError("Failed to load restaurant details. Please try again.")
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) return <p className="p-8">Loading...</p>
    if (error) return <p className="p-8 text-red-600">{error}</p>
    if (!restaurant) return <p className="p-8">Restaurant not found.</p>

    const imageUrl = restaurant?.photos?.[0] || restaurant?.photo || ""
    const priceRange = Number.isFinite(restaurant?.priceRange)
        ? restaurant.priceRange
        : 0

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-6xl mx-auto px-6">

                <div className="mb-6">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                </div>
                {/* Header */}
                <div className="bg-white rounded-xl shadow p-6 mb-8">
                    <div className="grid md:grid-cols-2 gap-6 items-center">

                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={restaurant?.name || "Restaurant"}
                                className="w-full h-72 object-cover rounded-lg"
                            />
                        ) : (
                            <div className="w-full h-72 rounded-lg bg-gray-200" />
                        )}

                        <div>
                            <h1 className="text-3xl font-bold mb-3">
                                {restaurant.name}
                            </h1>

                            <p className="text-lg mb-2">
                                Rating: {restaurant?.rating ?? "-"}
                            </p>

                            <p className="mb-2">
                                Price: {priceRange > 0 ? "$".repeat(priceRange) : "-"}
                            </p>

                            <p className={restaurant?.isOpen ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                {restaurant?.isOpen ? "Open Now" : "Closed"}
                            </p>

                            <p className="mt-4 text-gray-600">
                                {restaurant?.description || "No description provided."}
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
                        {reviews.length === 0 && (
                            <p className="text-gray-500">No reviews yet.</p>
                        )}
                        {reviews.map((rev) => (
                            <div key={rev.id} className="bg-white rounded-xl shadow p-5">
                                <div className="flex items-center gap-4 mb-4">
                                    {rev?.image ? (
                                        <img
                                            src={rev.image}
                                            alt={rev?.name || "Reviewer"}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gray-200" />
                                    )}

                                    <div>
                                        <p className="font-semibold">
                                            {rev?.name || "Anonymous"}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Rating: {rev?.rating ?? "-"}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-700">
                                    {rev?.text || "No review text."}
                                </p>

                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
