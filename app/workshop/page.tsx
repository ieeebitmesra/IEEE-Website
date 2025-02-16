import { Header1 } from "@/components/ui/header";

interface Workshop {
  number: string;
  title: string;
  duration: string;
  coursePlanning: {
    day: string;
    content: string;
  }[];
}

export default function WorkshopPage() {
  const workshops: Workshop[] = [
    {
      number: "1",
      title: "INTRODUCTION TO DATA SCIENCE",
      duration: "2 days",
      coursePlanning: [
        {
          day: "Day 1",
          content: "What is Data Science, Applications of Data Science, Python Libraries for Data Science, NumPy- Arrays, Standard Data Types, UFuncs, Aggregates, Broadcasting, Pandas- Series Object, DataFrame Object, Handling Missing Data, Trade-Offs in Missing Data Conventions, Missing Data in Pandas, Operating on Null Values, Combining Datasets: Concat and Append, Aggregation and Grouping, Matplotlib"
        },
        {
          day: "Day 2",
          content: "Linear Regression with Boston Housing Price Dataset, Logistic Regression with Titanic Dataset"
        }
      ]
    },
    {
      number: "2",
      title: "C/C++ WORKSHOP",
      duration: "3 days",
      coursePlanning: [
        {
          day: "Day 1",
          content: "Brief history of C, Constants and Variables, Keywords, Data Types in C, Operators, Storage Class, Functions and Conditional statements"
        },
        {
          day: "Day 2",
          content: "Looping Statements, Introduction to Arrays and Strings in C"
        },
        {
          day: "Day 3",
          content: "Pointers in C and Transition from C to C++"
        }
      ]
    },
    {
      number: "3",
      title: "DATA STRUCTURES WORKSHOP",
      duration: "3 days",
      coursePlanning: [
        {
          day: "Day 1",
          content: "Introduction to Data Structures, Stacks, Queues, Linked Lists, Linked Stacks and Linked Queues."
        },
        {
          day: "Day 2",
          content: "Trees, Binary Tree, Binary Tree Traversal, Binary Search Tree and Operations on BST."
        },
        {
          day: "Day 3",
          content: "Introduction to Graphs, Terminologies, Representation of Graphs, BFS, DFS, Dijkstra's Algorithm, Weighted Graphs, Spanning Trees, Prim's and Kruskal's Algorithm."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900">
      <Header1 />
      <div className="pt-24 px-4 md:px-8">
        <h1 className="text-5xl font-bold text-white text-center mb-16">Workshops</h1>
        
        <div className="max-w-6xl mx-auto space-y-8">
          {workshops.map((workshop) => (
            <div key={workshop.number} className="bg-[#0A0A2C]/80 rounded-lg p-6 backdrop-blur-sm border border-white/10">
              <div className="flex items-start gap-6">
                <div className="text-8xl font-bold text-white/10">{workshop.number}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white">{workshop.title}</h2>
                    <div className="flex items-center text-blue-400">
                      <span className="text-sm">Duration: {workshop.duration}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-blue-400">Course Planning</h3>
                    {workshop.coursePlanning.map((day) => (
                      <div key={day.day} className="text-white/80">
                        <span className="font-semibold">{day.day}:</span> {day.content}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex gap-4">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                      Join
                    </button>
                    <button className="px-6 py-2 border border-white/20 text-white rounded-full hover:bg-white/10 transition flex items-center gap-2">
                      <span>Download Resources</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 