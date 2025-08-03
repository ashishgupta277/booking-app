import SearchBar from "./SearchBar";

const Hero = () => {
    return (
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            </div>
            
            <div className="relative container mx-auto px-6 py-20">
                <div className="max-w-4xl">
                    <div className="space-y-6">
                        <h1 className="text-6xl md:text-7xl text-white font-bold font-serif leading-tight">
                            Find Your Next
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                                Dream Stay
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-white/90 font-light max-w-xl leading-relaxed mb-8">
                            Discover amazing hotels and destinations for your perfect vacation.<br />
                            Search low prices and book with confidence.
                        </p>
                    </div>
                </div>
                
                {/* Search Bar */}
                <div className="flex justify-center mt-16">
                    <SearchBar />
                </div>

                <div className="flex items-center gap-8 pt-8 text-white/80">
                    <div className="flex items-center gap-2">
                        <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold">4.9/5 Rating</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">Trusted by 1M+ travelers</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;