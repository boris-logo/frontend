function Testimonials() {
  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">
        What Our Clients Say
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <p>"HomeLink helped me find my dream house quickly!"</p>
          <h3 className="mt-4 font-semibold">- Alice</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p>"Very easy to use and reliable platform."</p>
          <h3 className="mt-4 font-semibold">- John</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p>"Best experience searching for rentals in Kigali."</p>
          <h3 className="mt-4 font-semibold">- Keza</h3>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;