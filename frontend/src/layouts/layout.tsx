import Footer from "../component/footer";
import Header from "../component/header";
import Hero from "../component/hero";

interface Props {
    children: React.ReactNode;
}

const Layout = ({children} : Props)=> {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
            <Header/>
            <Hero/>
            <div className="container mx-auto px-6 py-12"></div>
            <main className="flex-1 relative">
                <div className="container mx-auto px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;