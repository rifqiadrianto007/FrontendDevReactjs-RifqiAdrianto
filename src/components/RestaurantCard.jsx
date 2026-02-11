import { useNavigate } from "react-router-dom"

export default function RestaurantCard({ item }) {
    const navigate = useNavigate()
    const imageUrl = item?.photos?.[0] || ""
    const priceRange = Number.isFinite(item?.priceRange)
        ? item.priceRange
        : 0

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
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

            <p>
                Price: {priceRange > 0 ? "$".repeat(priceRange) : "-"}
            </p>

            <p className={item?.isOpen ? "text-green-600" : "text-red-600"}>
                {item?.isOpen ? "Open" : "Closed"}
            </p>
            <button
                onClick={() => navigate(`/restaurants/${item.id}`)}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Learn More
            </button>
        </div>
    )
}
