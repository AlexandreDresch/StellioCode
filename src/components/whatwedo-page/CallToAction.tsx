const CallToAction = () => {
  return (
    <section
      id="call-to-action"
      className="bg-blue-600 py-16 text-center text-white"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold">Pronto para trabalhar conosco?</h2>
        <p className="mt-4 text-lg">
          Transforme suas ideias em realidade com a nossa ajuda.
        </p>
        <button className="mt-6 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 shadow-lg transition duration-300 hover:bg-gray-100">
          Fale Conosco
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
