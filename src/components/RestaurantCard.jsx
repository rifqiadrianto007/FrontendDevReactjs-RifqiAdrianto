export default function RestaurantCard({ item }) {
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
        </div>
    )
}
