import React from 'react';
import MainLayout from '../components/layout/MainLayout';

const AboutPage = () => {
  return (
    <MainLayout>
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Hakkımızda</h1>
        <p className="text-gray-600 leading-relaxed">
          Biz, React ve Tailwind CSS kullanarak harika kullanıcı arayüzleri oluşturan bir ekibiz. 
          Bu yapı, projelerimizi düzenli ve yönetilebilir tutmamıza yardımcı oluyor.
        </p>
      </div>
    </MainLayout>
  );
};

export default AboutPage;