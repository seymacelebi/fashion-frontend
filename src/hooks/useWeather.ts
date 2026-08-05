import { useState, useEffect } from "react";

export const useWeather = (userCity: string | undefined) => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "c114c89f9165256f2d1ee55c8b6d4dee";

  useEffect(() => {
    const fetchWeather = async (url: string) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod !== 200) throw new Error(data.message);
        setWeather(data);
      } catch (err) {
        console.error("Hava durumu hatası:", err);
      } finally {
        setLoading(false);
      }
    };

    // 1. ADIM: Önce tarayıcıdan canlı konum iste (userCity olsa da olmasa da)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeather(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=tr`
          );
        },
        () => {
          // HATA/RED: Kullanıcı izin vermedi veya teknik hata oldu
          // O zaman 2. ADIM'a geç: Veritabanındaki şehri kontrol et
          if (userCity) {
            fetchWeather(
              `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${API_KEY}&units=metric&lang=tr`
            );
          } else {
            // Eğer şehir de yoksa yüklemeyi durdur
            setLoading(false);
            console.warn("Ne canlı konum ne de profil şehri bulunabildi.");
          }
        }
      );
    } else if (userCity) {
      // Tarayıcı GPS desteklemiyorsa doğrudan şehre git
      fetchWeather(
        `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${API_KEY}&units=metric&lang=tr`
      );
    } else {
      setLoading(false);
    }
  }, [userCity]);

  return { weather, loading };
};
