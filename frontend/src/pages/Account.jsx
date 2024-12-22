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

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/account', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
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
      const response = await fetch('/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      const updatedData = await response.json();
      setUserData(updatedData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Kullanıcı Bilgileri</h2>

      <div className="border p-4 mb-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium">İsim Soyisim</h3>
          <p>{userData.name || 'Yükleniyor...'}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">E-posta Adresi</h3>
          <p>{userData.email || 'Yükleniyor...'}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Parola</h3>
          <p>********</p>
        </div>

        {editMode && (
          <div className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium">İsim Soyisim</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-style"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">E-posta Adresi</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-style"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Parola</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
