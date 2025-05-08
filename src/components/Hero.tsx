export default function Hero() {
    return (
      <section className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(/assets/hero.jpg)` }}>
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start px-8">
          <h1 className="text-white text-5xl font-bold">Welcome to <span className="text-yellow-400">Holidaze</span></h1>
          <p className="text-white text-xl mt-2">Find your perfect stay</p>
        </div>
      </section>
    );
  }
  