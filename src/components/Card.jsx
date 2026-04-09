function Card({ image, title, location, price }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <img
        src={image}
        alt="house"
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500">{location}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-blue-600 font-bold">{price}</span>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;