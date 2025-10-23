import React, { useState, useEffect } from 'react';
// Impor fungsi API dari file utility Anda
import { authenticate, registerUser, forgotPassword } from '../utils/authApi';

const AuthModal = ({ show, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login', 'register', atau 'forgotPassword'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  // const [passwordConfirm, setPasswordConfirm] = useState(''); // Uncomment jika API register butuh ini
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (show) {
      setMode(initialMode);
      setError('');
      setSuccessMessage('');
      setEmail('');
      setPassword('');
      setName('');
      // setPasswordConfirm('');
    }
  }, [show, initialMode]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);
    try {
      const user = await authenticate({ email, password });
      console.log('Login berhasil:', user);
      setSuccessMessage('Login berhasil! Menutup modal...');
      setTimeout(() => {
        onClose(true); // Kirim 'true' untuk menandakan login sukses
      }, 2000);
    } catch (err) {
      setError(err.message || 'Email atau password salah.');
      console.error('Login gagal:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);
    
    // if (password !== passwordConfirm) {
    //   setError('Password dan konfirmasi password tidak cocok.');
    //   setIsLoading(false);
    //   return;
    // }

    try {
      // Sesuaikan payload sesuai kebutuhan API Anda
      const newUser = await registerUser({ name, email, password });
      console.log('Registrasi berhasil:', newUser);
      setSuccessMessage('Registrasi berhasil! Silakan login.');
      setMode('login'); // Ganti mode ke login setelah berhasil registrasi
    } catch (err) {
      setError(err.message || 'Gagal melakukan registrasi.');
      console.error('Registrasi gagal:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);
    try {
      await forgotPassword({ email });
      setSuccessMessage('Email instruksi reset password telah dikirim (jika terdaftar).');
    } catch (err) {
      setError(err.message || 'Gagal mengirim email reset password.');
      console.error('Lupa password gagal:', err);
    } finally {
      setIsLoading(false);
    }
  };


  if (!show) {
    return null;
  }

  const renderForm = () => {
    if (mode === 'login') {
      return (
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-slate-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
           <div className="flex items-center justify-end mb-6">
             <button
                type="button"
                onClick={() => setMode('forgotPassword')}
                className="inline-block align-baseline font-bold text-sm text-emerald-600 hover:text-emerald-800"
             >
                Lupa Password?
             </button>
           </div>
          <div className="flex items-center justify-between flex-col">
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors disabled:bg-slate-400"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className="inline-block align-baseline font-bold text-sm text-emerald-600 hover:text-emerald-800 mt-4"
            >
              Belum punya akun? Daftar di sini
            </button>
          </div>
        </form>
      );
    }

    if (mode === 'register') {
      return (
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="name">
              Nama Lengkap
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
              id="name"
              type="text"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
              id="email-register"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-slate-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
              id="password-register"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
           {/* <div className="mb-6">
             <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="passwordConfirm">
               Konfirmasi Password
             </label>
             <input
               className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-slate-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
               id="passwordConfirm"
               type="password"
               placeholder="******************"
               value={passwordConfirm}
               onChange={(e) => setPasswordConfirm(e.target.value)}
               required
             />
           </div>
           */}
          <div className="flex items-center justify-between flex-col">
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors disabled:bg-slate-400"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Daftar'}
            </button>
            <button
              type="button"
              onClick={() => setMode('login')}
              className="inline-block align-baseline font-bold text-sm text-emerald-600 hover:text-emerald-800 mt-4"
            >
              Sudah punya akun? Masuk
            </button>
          </div>
        </form>
      );
    }

    if (mode === 'forgotPassword') {
        return (
             <form onSubmit={handleForgotPassword}>
                <p className="text-slate-600 text-sm mb-4">
                    Masukkan email Anda. Kami akan mengirimkan link untuk me-reset password Anda.
                </p>
                <div className="mb-4">
                    <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="email-forgot">
                    Email
                    </label>
                    <input
                    className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    id="email-forgot"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div className="flex items-center justify-between flex-col">
                    <button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors disabled:bg-slate-400"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Mengirim...' : 'Kirim Email Reset'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('login')}
                        className="inline-block align-baseline font-bold text-sm text-emerald-600 hover:text-emerald-800 mt-4"
                    >
                        Kembali ke Login
                    </button>
                </div>
             </form>
        )
    }
  };
  
  const getTitle = () => {
    if (mode === 'login') return 'Masuk';
    if (mode === 'register') return 'Daftar Akun Baru';
    if (mode === 'forgotPassword') return 'Lupa Password';
    return '';
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity" onClick={() => onClose(false)}>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md m-4 transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{getTitle()}</h2>
          <button onClick={() => onClose(false)} className="text-slate-500 hover:text-slate-800 text-2xl">&times;</button>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">{error}</div>}
        {successMessage && <div className="bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded-md mb-4" role="alert">{successMessage}</div>}

        {renderForm()}
      </div>
    </div>
  );
};

export default AuthModal;
