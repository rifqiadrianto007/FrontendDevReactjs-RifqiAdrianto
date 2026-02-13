import { useNavigate } from "react-router-dom"

export default function RestaurantCard({ item }) {
    const navigate = useNavigate()

    // star rating render
    const renderStars = (rating) => {
        const safeRating = Number.isFinite(rating) ? rating : 0
        const fullStars = Math.max(0, Math.min(5, Math.floor(safeRating)))
        return "★".repeat(fullStars) + "☆".repeat(5 - fullStars)
    }

    // ekstak data
    const imageUrl = item?.photos?.[0] || item?.photo || ""
    const priceRange = Number.isFinite(item?.priceRange) ? item.priceRange : 0
    const primaryCategory = item?.categories?.[0]

    return (
        <div className="bg-white p-4">
            <div className="h-40 bg-gray-200 mb-4 overflow-hidden">
                {imageUrl ? (
                    <img src={imageUrl} alt={item?.name || "Restaurant"}
                        className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-200" />
                )}
            </div>
            <h3 className="font-medium mb-1">
                {item?.name || "Unnamed Restaurant"}
            </h3>
            <div className="text-sm mb-2 text-blue-900">
                {renderStars(item.rating)}
            </div>
            <div className="text-xs text-gray-500 flex items-center justify-between mb-4">
                <span>
                    {primaryCategory ? primaryCategory.toUpperCase() : "UNKNOWN"} · {priceRange > 0 ? "$".repeat(priceRange) : "-"}
                </span>
                <div className="flex items-center gap-2">
                    <span
                        className={`w-2 h-2 rounded-full ${item.isOpen ? "bg-green-500" : "bg-red-500"
                            }`}
                    ></span>
                    {item?.isOpen ? "OPEN NOW" : "CLOSED"}
                </div>
            </div>
            <button
                onClick={() => navigate(`/restaurants/${item.id}`)}
                className="w-full bg-blue-900 text-white py-2 text-sm">
                LEARN MORE
            </button>
        </div>
    )
}
