const BASE_URL = "http://localhost:8080/api";

const getHeaders = () => ({
  "Content-Type": "application/json",
  ...(localStorage.getItem("token") && {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }),
});

const request = async (method, path, body) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: getHeaders(),
    ...(body && { body: JSON.stringify(body) }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

export const api = {
  // Auth
  login: (data) => request("POST", "/auth/login", data),
  signup: (data) => request("POST", "/auth/signup", data),

  // Semesters
  getSemesters: () => request("GET", "/semesters"),

  // Streams
  getStreams: (semId) => request("GET", `/streams?semesterId=${semId}`),

  // Subjects
  getSubjects: (semId, streamId) =>
    request("GET", `/subjects?semesterId=${semId}&streamId=${streamId}`),
  getSubject: (id) => request("GET", `/subjects/${id}`),

  // Materials
  getMaterials: (subjectId) => request("GET", `/materials?subjectId=${subjectId}`),

  // Syllabus
  getSyllabus: (subjectId) => request("GET", `/syllabus?subjectId=${subjectId}`),

  // PYQ
  getPYQ: (subjectId) => request("GET", `/pyq?subjectId=${subjectId}`),

  // Videos
  getVideos: (subjectId) => request("GET", `/videos?subjectId=${subjectId}`),

  // Dashboard
  getRecentActivity: () => request("GET", "/dashboard/recent"),
};

// Dummy data fallbacks for demo mode (when backend is not running)
export const dummyData = {
  semesters: Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    name: `Semester ${i + 1}`,
    subjectCount: [6, 6, 7, 7, 6, 6, 5, 5][i],
    icon: ["⚡", "🔬", "📐", "🧮", "💡", "🖥️", "🏗️", "🎓"][i],
    description: ["Foundations of engineering", "Core sciences", "Advanced mathematics", "Electives begin", "Specialization starts", "Industry projects", "Pre-final term", "Thesis & placements"][i],
  })),

  streams: [
    { id: 1, name: "Computer Science Engineering", code: "CSE", icon: "💻", color: "#2563eb" },
    { id: 2, name: "Information Technology", code: "IT", icon: "🌐", color: "#0891b2" },
    { id: 3, name: "Electronics & Communication", code: "ECE", icon: "📡", color: "#7c3aed" },
    { id: 4, name: "Electrical Engineering", code: "EE", icon: "⚡", color: "#d97706" },
    { id: 5, name: "Mechanical Engineering", code: "ME", icon: "⚙️", color: "#059669" },
    { id: 6, name: "Civil Engineering", code: "CE", icon: "🏛️", color: "#dc2626" },
  ],

  subjects: {
    "3-1": [
      { id: 1, name: "Data Structures & Algorithms", code: "CS301", credits: 4 },
      { id: 2, name: "Engineering Mathematics III", code: "MA301", credits: 3 },
      { id: 3, name: "Digital Logic Design", code: "CS302", credits: 4 },
      { id: 4, name: "Computer Organization", code: "CS303", credits: 3 },
      { id: 5, name: "Object Oriented Programming", code: "CS304", credits: 4 },
      { id: 6, name: "Discrete Mathematics", code: "MA302", credits: 3 },
      { id: 7, name: "Technical Communication", code: "HS301", credits: 2 },
    ],
  },

  materials: [
    { id: 1, title: "Unit 1 - Introduction to DS", type: "PDF Notes", size: "2.4 MB", uploadedBy: "Prof. Sharma", date: "2024-01-15" },
    { id: 2, title: "Unit 2 - Arrays and Linked Lists", type: "PDF Notes", size: "3.1 MB", uploadedBy: "Prof. Sharma", date: "2024-01-20" },
    { id: 3, title: "Unit 3 - Trees and Graphs", type: "Lecture Slides", size: "5.8 MB", uploadedBy: "Prof. Gupta", date: "2024-02-01" },
    { id: 4, title: "Unit 4 - Sorting Algorithms", type: "PDF Notes", size: "2.9 MB", uploadedBy: "Prof. Sharma", date: "2024-02-10" },
    { id: 5, title: "Reference Book - CLRS Chapter 1-5", type: "Book Extract", size: "8.2 MB", uploadedBy: "Admin", date: "2024-01-10" },
  ],

  syllabus: [
    {
      module: 1, title: "Introduction to Data Structures",
      topics: ["Overview of data structures", "Abstract data types", "Algorithm analysis", "Time and space complexity", "Big-O notation"],
    },
    {
      module: 2, title: "Linear Data Structures",
      topics: ["Arrays and strings", "Linked lists (singly, doubly, circular)", "Stacks and queues", "Applications of stacks", "Priority queues"],
    },
    {
      module: 3, title: "Trees",
      topics: ["Binary trees", "Binary search trees", "AVL trees", "Red-black trees", "Heap data structure", "Tree traversals"],
    },
    {
      module: 4, title: "Graphs",
      topics: ["Graph representations", "BFS and DFS", "Shortest path algorithms", "Minimum spanning trees", "Topological sorting"],
    },
    {
      module: 5, title: "Sorting and Searching",
      topics: ["Bubble, selection, insertion sort", "Quick sort and merge sort", "Heap sort", "Linear and binary search", "Hashing techniques"],
    },
  ],

  pyq: [
    { id: 1, year: 2024, exam: "End Semester", subject: "Data Structures", pages: 4 },
    { id: 2, year: 2023, exam: "End Semester", subject: "Data Structures", pages: 4 },
    { id: 3, year: 2023, exam: "Mid Semester", subject: "Data Structures", pages: 2 },
    { id: 4, year: 2022, exam: "End Semester", subject: "Data Structures", pages: 4 },
    { id: 5, year: 2022, exam: "Mid Semester", subject: "Data Structures", pages: 2 },
    { id: 6, year: 2021, exam: "End Semester", subject: "Data Structures", pages: 4 },
    { id: 7, year: 2020, exam: "End Semester", subject: "Data Structures", pages: 3 },
  ],

  videos: [
    { id: 1, title: "Introduction to Data Structures", youtubeId: "RBSGKlAvoiM", channel: "CS Dojo", duration: "14:23", views: "2.1M" },
    { id: 2, title: "Arrays in Data Structures", youtubeId: "QJNwK2uJyGs", channel: "Neso Academy", duration: "22:10", views: "1.8M" },
    { id: 3, title: "Linked List Full Course", youtubeId: "R9PTBwOzceo", channel: "freeCodeCamp", duration: "3:27:00", views: "3.4M" },
    { id: 4, title: "Trees Data Structure", youtubeId: "fAAZixBzIAI", channel: "Abdul Bari", duration: "31:45", views: "1.2M" },
    { id: 5, title: "Graph Algorithms for Beginners", youtubeId: "tWVWeAqZ0WU", channel: "freeCodeCamp", duration: "2:41:00", views: "2.8M" },
    { id: 6, title: "Sorting Algorithms Explained", youtubeId: "g-PGLbMth_g", channel: "CS50", duration: "26:33", views: "890K" },
  ],
};
