import React, { useState, useEffect } from "react";

// StudentCard subcomponent demonstrating component modularity and props
function StudentCard({ student }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
          {student.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{student.name}</h3>
          <p className="text-xs text-blue-600 font-medium">@{student.username}</p>
        </div>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>Roll/ID:</strong> STU-{student.id.toString().padStart(3, "0")}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>City:</strong> {student.address?.city}</p>
        <p><strong>Institute/Company:</strong> {student.company?.name}</p>
      </div>
    </div>
  );
}

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetching records from a public dummy API
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error(`Failed to fetch data (Status ${response.status})`);
      }
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <header className="bg-white p-6 rounded-2xl shadow-md mb-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Practical 17: Student List (Read Operation via API)
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Retrieving dummy student API data using <code className="bg-gray-100 text-blue-600 px-1 py-0.5 rounded">fetch()</code> and rendering via React components and <code className="bg-gray-100 text-blue-600 px-1 py-0.5 rounded">map()</code>.
            </p>
          </div>
          <button
            onClick={fetchStudents}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            🔄 Refresh List
          </button>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="bg-white p-12 rounded-2xl shadow-md text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mb-3"></div>
            <p className="text-gray-600 font-medium">Fetching student records from API...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center">
            <p className="font-bold text-lg mb-1">Error Loading Student Data</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchStudents}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-red-700 transition"
            >
              Retry Fetch
            </button>
          </div>
        )}

        {/* Read & Render Using Components and map() */}
        {!loading && !error && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Enrolled Students ({students.length})
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {students.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
