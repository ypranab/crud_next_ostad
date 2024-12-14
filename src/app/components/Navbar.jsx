import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold text-purple-600">CRUD</span>
        </div>
        <nav className="space-x-6">
          <Link href="/" className="text-gray-600 hover:text-purple-600">
            Product List
          </Link>
          <Link href="/create" className="text-gray-600 hover:text-purple-600">
            Create
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
