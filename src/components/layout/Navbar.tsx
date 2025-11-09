import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-stone-200">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo'yu ana sayfaya yönlendiren Link bileşeni */}
        <Link to="/" className="text-3xl font-serif font-bold text-stone-900">
          StilRehberi
        </Link>
        
        {/* Sağ taraftaki menü linkleri */}
        <div className="flex items-center space-x-10 text-stone-600">
          <Link to="/combinations" className="hidden md:block hover:text-stone-900 transition duration-300">
            İlham Al
          </Link>
          
          {/* Kullanıcı giriş durumuna göre dinamik olarak değişen bölüm */}
          {isLoggedIn ? (
            <>
              <Link to="/wardrobe" className="hidden md:block hover:text-stone-900 transition duration-300">
                Gardırobum
              </Link>
              <button onClick={logout} className="border border-stone-800 text-stone-800 px-5 py-2 rounded-full hover:bg-stone-800 hover:text-white transition duration-300">
                Çıkış Yap
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="border border-stone-800 text-stone-800 px-5 py-2 rounded-full hover:bg-stone-800 hover:text-white transition duration-300">
                Giriş Yap
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

