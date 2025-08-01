import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
const Header = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-lg border-b border-emerald-500">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="group">
                        <span className="text-3xl font-bold tracking-tight font-serif bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent group-hover:from-emerald-100 group-hover:to-white transition-all duration-300">
                            MernHoliday.com
                        </span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Link 
                                    to="my-bookings"
                                    className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-500/20 border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    My Bookings
                                </Link>
                                <Link 
                                    to="my-hotels"
                                    className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-semibold hover:bg-cyan-500/20 border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    My Hotels
                                </Link>
                                {/* <Link to="/logout" className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                    Logout
                                </Link> */}
                                <SignOutButton/>
                            </>
                        ) : (
                            <>
                                <span className="flex space-x-2">
                                    <Link 
                                        to="/signin" 
                                        className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    >
                                        Sign In
                                    </Link>
                                </span>
                                <span className="flex space-x-2">
                                <Link 
                                    to="/register" 
                                    className="bg-gradient-to-r from-white to-emerald-50 text-emerald-700 px-6 py-2 rounded-lg font-semibold hover:from-emerald-50 hover:to-white transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    Sign Up
                                </Link>
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;