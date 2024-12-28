import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Account() {
  const { token, navigate } = useContext(ShopContext);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [editMode, setEditMode] = useState(false);

  // Kullanıcı verisini API'den alıyoruz
  useEffect(() => {
    if (!token) {
      navigate('/login'); // Token yoksa login sayfasına yönlendir
    } else {
      fetchUserData(); // Token varsa veriyi çekmeye başla
    }
  }, [token, navigate]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/account', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        console.error('Response error:', response.statusText);
        throw new Error('Failed to fetch user data');
      }
  
      // Yanıtın text olarak alınması
      const textResponse = await response.text();
      console.log('API Response:', textResponse); // Yanıtı konsola yazdırın
  
      // Eğer yanıt JSON ise, parse et
      let data = {};
      try {
        data = JSON.parse(textResponse); // JSON.parse ile parse edilmeye çalışır
      } catch (e) {
        console.error("Yanıt JSON formatında değil: ", e);
      }
  
      // Burada veriyi işleme
      setUserData(data);
      setFormData({
        name: data.name,
        email: data.email,
        password: '',
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  

  const handleUpdate = async () => {
    try {
      // Düzenlenen formu birleştir
      const dataToUpdate = {
        ...formData,
        password: formData.password ? formData.password : undefined, // Parola varsa gönder
      };

      const response = await fetch('/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate), // Güncel verileri body olarak gönder
      });

      if (!response.ok) {
        console.error('Response error:', response.statusText);
        throw new Error('Failed to update user data');
      }

      const updatedData = await response.json(); // Güncellenen veriyi al
      setUserData(updatedData); // Güncellenen veriyi state'e kaydet
      setEditMode(false); // Düzenleme modunu kapat
    } catch (error) {
      console.error('Error updating user data:', error);
      // Burada kullanıcıya hata mesajı gösterebilirsiniz
    }
  };

  const handleEditToggle = () => {
    setEditMode((prev) => !prev); // Düzenleme modunu aç/kapa
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Formu güncelle
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Kullanıcı Bilgileri</h2>

      <div className="border p-4 mb-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium">İsim Soyisim</h3>
          <p>{userData.name || 'Yükleniyor...'}</p> {/* Kullanıcı adı */}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">E-posta Adresi</h3>
          <p>{userData.email || 'Yükleniyor...'}</p> {/* Kullanıcı e-posta */}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Parola</h3>
          <p>********</p> {/* Parola gizli */}
        </div>

        {editMode && (
          <div className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium">İsim Soyisim</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange} // Değişiklikleri işle
                className="input-style"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">E-posta Adresi</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange} // Değişiklikleri işle
                className="input-style"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Parola</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange} // Değişiklikleri işle
                className="input-style"
              />
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-4">
          {editMode ? (
            <>
              <button onClick={handleUpdate} className="btn-primary">
                Kaydet
              </button>
              <button onClick={handleEditToggle} className="btn-secondary">
                İptal
              </button>
            </>
          ) : (
            <button onClick={handleEditToggle} className="btn-primary">
              Düzenle
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
