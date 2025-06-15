import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
            <h1 className="text-6xl text-grad mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">404</h1>

            <p className="text-xl font-semibold text-gray-800 mb-2">Oops! Halaman tidak ditemukan</p>

            <p className="text-gray-600 mb-6">
                Halaman yang kamu cari mungkin telah dipindahkan atau tidak tersedia.
            </p>

            <Link
                to="/"
                className="inline-block px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
};

export default NotFound;
