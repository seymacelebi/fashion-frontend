// import React from 'react';
// import MainLayout from '../components/layout/MainLayout';
// import Button from '../components/common/Button';

import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

// const HomePage = () => {
//   return (
//     <MainLayout>
//       <div className="text-center">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">Ana Sayfaya Hoş Geldiniz!</h1>
//         <p className="text-gray-600 mb-8">Bu, Tailwind CSS ile oluşturulmuş harika bir başlangıç sayfasıdır.</p>
//         <Button onClick={() => alert('Butona tıklandı!')}>
//           Daha Fazla Bilgi
//         </Button>
//       </div>
//     </MainLayout>
//   );
// };

// export default HomePage;
   const HeroSection = () => {
            //const { isLoggedIn, login } = useAuth();
            return (
                <section className="container mx-auto px-6 py-24 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2">
                        <h1 className="font-serif text-6xl md:text-7xl font-bold text-stone-900 leading-tight">Zahmetsiz Stil,<br/>Her Gün.</h1>
                        <p className="text-lg text-stone-600 mt-6 max-w-lg">Gardırobunuzdaki potansiyeli ortaya çıkarın. Parçalarınızı seçin, size en uygun kombinleri ve renk paletlerini anında oluşturalım.</p>
                        {/* {!isLoggedIn && (
                             <button onClick={login} className="mt-10 inline-block bg-stone-800 text-white text-lg font-semibold px-10 py-4 rounded-full hover:bg-stone-900 transition duration-300 shadow-lg transform hover:scale-105">
                                Stilini Yarat (Giriş Yap)
                            </button>
                        )} */}
                    </div>
                    <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
                        <img src="https://placehold.co/500x600/e7e5e4/44403c?text=Stil" alt="Moda görseli" className="rounded-xl shadow-2xl" />
                    </div>
                </section>
            );
        };

        const FeaturedCombinations = () => (
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl font-bold text-stone-900">İlham Alın</h2>
                        <p className="text-stone-600 mt-2">Editörlerimizin seçtiği en son kombinler</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Kartlar buraya map ile eklenebilir */}
                        <div className="group">
                            <div className="overflow-hidden rounded-xl"><img src="https://placehold.co/600x700/f5f5f4/44403c?text=Minimal+Ofis" alt="Minimal Ofis Kombini" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"/></div>
                            <div className="mt-4"><p className="text-sm text-stone-500">Ofis Stili</p><h3 className="text-xl font-bold text-stone-800 mt-1">Bej Blazer & Keten Pantolon</h3></div>
                        </div>
                        <div className="group">
                            <div className="overflow-hidden rounded-xl"><img src="https://placehold.co/600x700/d6d3d1/44403c?text=Sokak+Stili" alt="Sokak Stili Kombini" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"/></div>
                            <div className="mt-4"><p className="text-sm text-stone-500">Hafta Sonu</p><h3 className="text-xl font-bold text-stone-800 mt-1">Trençkot & Beyaz Sneaker</h3></div>
                        </div>
                        <div className="group">
                            <div className="overflow-hidden rounded-xl"><img src="https://placehold.co/600x700/a8a29e/44403c?text=Ak%C5%9Fam+%C5%9E%C4%B1kl%C4%B1%C4%9F%C4%B1" alt="Akşam Şıklığı Kombini" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"/></div>
                            <div className="mt-4"><p className="text-sm text-stone-500">Özel Davet</p><h3 className="text-xl font-bold text-stone-800 mt-1">Saten Elbise & Topuklu Ayakkabı</h3></div>
                        </div>
                    </div>
                </div>
            </section>
        );

        const HowItWorks = () => (
             <section className="py-24 bg-stone-800 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="font-serif text-4xl font-bold mb-12">3 Adımda Stilini Bul</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div><div className="text-5xl font-serif mb-4">1.</div><h3 className="text-2xl font-bold mb-2">Parçalarını Seç</h3><p className="text-stone-300">Gardırobundan üst, alt, ayakkabı ve aksesuar gibi parçaları seç.</p></div>
                        <div><div className="text-5xl font-serif mb-4">2.</div><h3 className="text-2xl font-bold mb-2">Kombinleri Gör</h3><p className="text-stone-300">Seçtiğin parçalarla oluşturulabilecek en uyumlu kombin önerilerini anında gör.</p></div>
                        <div><div className="text-5xl font-serif mb-4">3.</div><h3 className="text-2xl font-bold mb-2">Kaydet & Paylaş</h3><p className="text-stone-300">Beğendiğin kombinleri profiline kaydet veya arkadaşlarınla paylaş.</p></div>
                    </div>
                </div>
            </section>
        );

        const HomePage = () => (
            <main>
              <Navbar />
                <HeroSection />
                <FeaturedCombinations />
                <HowItWorks />
                <Footer />
            </main>
        );
export default HomePage;