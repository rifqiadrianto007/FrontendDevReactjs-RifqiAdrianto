import { useNavigate } from "react-router-dom"

export default function RestaurantCard({ item }) {
    const navigate = useNavigate()

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating)
        return "★".repeat(fullStars) + "☆".repeat(5 - fullStars)
    }

    return (
        <div className="bg-white p-4">
            <div className="h-40 bg-gray-200 mb-4 overflow-hidden">
                <img
                    src={item.photos?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className="font-medium mb-1">
                {item.name}
            </h3>
            <div className="text-sm mb-2 text-blue-900">
                {renderStars(item.rating)}
            </div>
            <div className="text-xs text-gray-500 flex items-center justify-between mb-4">
                <span>
                    {item.categories?.[0]?.toUpperCase()} · {"$".repeat(item.priceRange)}
                </span>
                <div className="flex items-center gap-2">
                    <span
                        className={`w-2 h-2 rounded-full ${item.isOpen ? "bg-green-500" : "bg-red-500"
                            }`}
                    ></span>
                    {item.isOpen ? "OPEN NOW" : "CLOSED"}
                </div>
            </div>
            <button
                onClick={() => navigate(`/restaurants/${item.id}`)}
                className="w-full bg-blue-900 text-white py-2 text-sm"
            >
                LEARN MORE
            </button>
        </div>
    )
}
