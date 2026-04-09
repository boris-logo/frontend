function Serachbar() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 max-w-4xl mx-auto -mt-10 relative z-10">
      <div className="grid md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Location"
          className="p-3 border rounded-lg w-full"
        />

        <input
          type="text"
          placeholder="Property Type"
          className="p-3 border rounded-lg w-full"
        />

        <input
          type="number"
          placeholder="Max Price"
          className="p-3 border rounded-lg w-full"
        />

        <button className="bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Search
        </button>
      </div>
    </div>
  );
}

export default Serachbar;