export function Navbar() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-red-500 hover:text-red-600">
          Nutri Checker
        </a>
        <nav className="flex items-center gap-4">
          <a href="/signin" className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">
            Sign In
          </a>
          <a href="/signup" className="px-4 py-2 text-sm rounded-md bg-red-500 hover:bg-red-600 text-white">
            Sign Up
          </a>
        </nav>
      </nav>
    </header>
  )
}
