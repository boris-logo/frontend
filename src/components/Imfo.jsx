function Imfo() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-6">Why Choose HomeLink?</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="font-semibold text-lg">Trusted Listings</h3>
          <p className="text-gray-500">All properties are verified.</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="font-semibold text-lg">Easy Search</h3>
          <p className="text-gray-500">Find homes quickly with filters.</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="font-semibold text-lg">Affordable</h3>
          <p className="text-gray-500">Options for every budget.</p>
        </div>
      </div>
    </div>
  );
}

export default Imfo;