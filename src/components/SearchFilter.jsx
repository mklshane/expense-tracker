const SearchFilter = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative ">
      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-3 pl-11 bg-white border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-transparent transition-all duration-200"
      />
      <svg
        className="absolute left-4 top-4 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default SearchFilter;
