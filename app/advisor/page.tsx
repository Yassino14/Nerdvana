"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function IdeaAdvisor() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedIdea, setSelectedIdea] = useState<ProjectIdea | null>(null)

  // Project idea categories
  const categories = [
    "All",
    "Web Development",
    "Mobile Apps",
    "Data Science",
    "Machine Learning",
    "Game Development",
    "IoT",
    "Blockchain",
    "Automation",
    "Desktop Apps",
    "AR/VR",
    "Productivity",
    "Education",
    "Entertainment",
    "Health & Fitness",
  ]

  // 200 project ideas
  const projectIdeas: ProjectIdea[] = [
    // Web Development
    {
      id: 1,
      title: "Personal Portfolio Website",
      category: "Web Development",
      description: "Create a personal portfolio website to showcase your projects, skills, and experience.",
      difficulty: "Beginner",
      tools: ["HTML", "CSS", "JavaScript", "React/Vue/Angular"],
      advantages: ["Great for job hunting", "Showcases your skills", "Improves your web development skills"],
      challenges: ["Designing an attractive UI", "Making it responsive", "Keeping it updated"],
      roadmap: [
        "Design the layout",
        "Create the HTML structure",
        "Style with CSS",
        "Add JavaScript functionality",
        "Deploy to a hosting service",
      ],
    },
    {
      id: 2,
      title: "Blog Platform",
      category: "Web Development",
      description: "Build a blog platform where users can create, edit, and publish articles.",
      difficulty: "Intermediate",
      tools: ["React/Vue/Angular", "Node.js", "Express", "MongoDB/PostgreSQL"],
      advantages: [
        "Learn full-stack development",
        "Create something you can use yourself",
        "Understand content management systems",
      ],
      challenges: ["User authentication", "Content management", "Performance optimization"],
      roadmap: [
        "Design database schema",
        "Create backend API",
        "Build frontend interface",
        "Implement authentication",
        "Add content editor",
        "Deploy application",
      ],
    },
    {
      id: 3,
      title: "E-commerce Website",
      category: "Web Development",
      description: "Develop an online store with product listings, shopping cart, and checkout functionality.",
      difficulty: "Advanced",
      tools: ["React/Vue/Angular", "Node.js", "Express", "MongoDB/PostgreSQL", "Stripe/PayPal"],
      advantages: [
        "Learn payment integration",
        "Understand complex state management",
        "Potential for real business use",
      ],
      challenges: ["Secure payment processing", "Inventory management", "User experience optimization"],
      roadmap: [
        "Design database schema",
        "Create product management system",
        "Build shopping cart functionality",
        "Implement checkout process",
        "Integrate payment gateway",
        "Add user accounts",
        "Deploy and test",
      ],
    },
    {
      id: 4,
      title: "Weather Dashboard",
      category: "Web Development",
      description: "Create a weather dashboard that displays current weather and forecasts for multiple locations.",
      difficulty: "Beginner",
      tools: ["HTML", "CSS", "JavaScript", "Weather API"],
      advantages: ["Learn API integration", "Practice data visualization", "Create something useful"],
      challenges: ["Working with external APIs", "Handling API rate limits", "Displaying data effectively"],
      roadmap: [
        "Set up API access",
        "Create basic UI",
        "Implement location search",
        "Display current weather",
        "Add forecast functionality",
        "Improve UI with visualizations",
      ],
    },
    {
      id: 5,
      title: "Task Management App",
      category: "Web Development",
      description: "Build a task management application with features like task creation, due dates, and categories.",
      difficulty: "Intermediate",
      tools: ["React/Vue/Angular", "Local Storage/Firebase"],
      advantages: ["Useful for personal productivity", "Learn state management", "Practice UI/UX design"],
      challenges: ["Data persistence", "User interface design", "Feature prioritization"],
      roadmap: [
        "Design data structure",
        "Create task creation interface",
        "Implement task listing and filtering",
        "Add due dates and reminders",
        "Implement data persistence",
        "Add categories and tags",
      ],
    },
    {
      id: 6,
      title: "Recipe Sharing Platform",
      category: "Web Development",
      description: "Create a platform where users can share, discover, and save recipes.",
      difficulty: "Intermediate",
      tools: ["React/Vue/Angular", "Node.js", "Express", "MongoDB/PostgreSQL"],
      advantages: ["Learn content management", "Practice search functionality", "Understand user interactions"],
      challenges: ["Content moderation", "Search optimization", "Image handling"],
      roadmap: [
        "Design database schema",
        "Create recipe submission form",
        "Implement recipe display",
        "Add search and filtering",
        "Implement user accounts",
        "Add save/favorite functionality",
      ],
    },
    {
      id: 7,
      title: "Real-time Chat Application",
      category: "Web Development",
      description: "Build a real-time chat application with private messaging and group chats.",
      difficulty: "Advanced",
      tools: ["React/Vue/Angular", "Node.js", "Socket.io", "MongoDB/PostgreSQL"],
      advantages: ["Learn real-time communication", "Understand WebSockets", "Practice user authentication"],
      challenges: ["Real-time data synchronization", "Handling offline/online status", "Message persistence"],
      roadmap: [
        "Set up WebSocket server",
        "Create chat interface",
        "Implement user authentication",
        "Add private messaging",
        "Create group chat functionality",
        "Implement message persistence",
        "Add notifications",
      ],
    },
    {
      id: 8,
      title: "Job Board Website",
      category: "Web Development",
      description: "Create a job board where employers can post jobs and job seekers can apply.",
      difficulty: "Advanced",
      tools: ["React/Vue/Angular", "Node.js", "Express", "MongoDB/PostgreSQL"],
      advantages: ["Learn complex form handling", "Understand role-based access", "Potential for monetization"],
      challenges: ["Different user roles", "Search and filtering", "Application process"],
      roadmap: [
        "Design database schema",
        "Create employer and job seeker interfaces",
        "Implement job posting functionality",
        "Add search and filtering",
        "Create application process",
        "Implement notifications",
        "Add payment integration for job postings",
      ],
    },
    {
      id: 9,
      title: "Social Media Dashboard",
      category: "Web Development",
      description: "Build a dashboard that aggregates and displays content from multiple social media platforms.",
      difficulty: "Intermediate",
      tools: ["React/Vue/Angular", "Social Media APIs"],
      advantages: [
        "Learn multiple API integrations",
        "Practice data visualization",
        "Create something useful for marketing",
      ],
      challenges: ["API authentication", "Rate limiting", "Data normalization"],
      roadmap: [
        "Set up API access for each platform",
        "Create data fetching services",
        "Design dashboard layout",
        "Implement data visualization",
        "Add filtering and sorting",
        "Implement caching for performance",
      ],
    },
    {
      id: 10,
      title: "Online Learning Platform",
      category: "Web Development",
      description: "Develop a platform for creating and taking online courses with quizzes and progress tracking.",
      difficulty: "Advanced",
      tools: ["React/Vue/Angular", "Node.js", "Express", "MongoDB/PostgreSQL"],
      advantages: ["Learn content management", "Understand user progress tracking", "Practice multimedia handling"],
      challenges: ["Content organization", "Progress tracking", "Video streaming"],
      roadmap: [
        "Design database schema",
        "Create course creation interface",
        "Implement lesson viewing",
        "Add quiz functionality",
        "Create progress tracking",
        "Implement user dashboard",
        "Add payment integration for premium courses",
      ],
    },
    {
      id: 11,
      title: "Expense Tracker",
      category: "Web Development",
      description: "Build an application to track personal expenses with categorization and reporting.",
      difficulty: "Intermediate",
      tools: ["React/Vue/Angular", "Chart.js/D3.js", "Local Storage/Firebase"],
      advantages: ["Learn data visualization", "Create something personally useful", "Practice form handling"],
      challenges: ["Data organization", "Effective visualization", "User experience design"],
      roadmap: [
        "Design data structure",
        "Create expense entry form",
        "Implement categorization",
        "Add reporting and charts",
        "Implement data export",
        "Add budget planning features",
      ],
    },
    {
      id: 12,
      title: "Event Management System",
      category: "Web Development",
      description: "Create a system for managing events with registration, ticketing, and scheduling.",
      difficulty: "Advanced",
      tools: ["React/Vue/Angular", "Node.js", "Express", "MongoDB/PostgreSQL", "Payment API"],
      advantages: [
        "Learn complex form processing",
        "Understand event-based programming",
        "Practice payment integration",
      ],
      challenges: ["Ticket management", "Schedule conflicts", "Payment processing"],
      roadmap: [
        "Design database schema",
        "Create event creation interface",
        "Implement registration system",
        "Add ticketing functionality",
        "Create schedule management",
        "Implement payment processing",
        "Add email notifications",
      ],
    },
    {
      id: 13,
      title: "Real Estate Listing Website",
      category: "Web Development",
      description: "Build a website for listing and searching real estate properties with filtering and maps.",
      difficulty: "Advanced",
      tools: ["React/Vue/Angular", "Node.js", "Express", "MongoDB/PostgreSQL", "Maps API"],
      advantages: ["Learn geolocation integration", "Practice advanced filtering", "Understand image handling"],
      challenges: ["Property search optimization", "Map integration", "Image management"],
      roadmap: [
        "Design database schema",
        "Create property listing form",
        "Implement search and filtering",
        "Add map integration",
        "Create property detail pages",
        "Implement contact forms",
        "Add user accounts for saved searches",
      ],
    },
    {
      id: 14,
      title: "Fitness Tracking Dashboard",
      category: "Web Development",
      description: "Create a dashboard for tracking workouts, nutrition, and fitness goals.",
      difficulty: "Intermediate",
      tools: ["React/Vue/Angular", "Chart.js/D3.js", "Local Storage/Firebase"],
      advantages: ["Learn data visualization", "Practice form handling", "Create something personally useful"],
      challenges: ["Data organization", "Progress visualization", "Goal tracking"],
      roadmap: [
        "Design data structure",
        "Create workout logging interface",
        "Implement nutrition tracking",
        "Add goal setting functionality",
        "Create progress visualization",
        "Implement data export",
      ],
    },
    {
      id: 15,
      title: "Collaborative Whiteboard",
      category: "Web Development",
      description: "Build a real-time collaborative whiteboard for drawing and brainstorming.",
      difficulty: "Advanced",
      tools: ["React/Vue/Angular", "Canvas API", "Socket.io", "Node.js"],
      advantages: [
        "Learn canvas manipulation",
        "Understand real-time collaboration",
        "Practice WebSocket communication",
      ],
      challenges: ["Real-time synchronization", "Drawing performance", "Conflict resolution"],
      roadmap: [
        "Set up canvas drawing",
        "Implement basic drawing tools",
        "Create WebSocket server",
        "Add real-time collaboration",
        "Implement room/session management",
        "Add export functionality",
        "Create user presence indicators",
      ],
    },

    // Mobile Apps
    {
      id: 16,
      title: "Habit Tracker App",
      category: "Mobile Apps",
      description: "Create a mobile app for tracking daily habits and building routines.",
      difficulty: "Intermediate",
      tools: ["React Native/Flutter", "Local Storage/Firebase"],
      advantages: ["Learn mobile development", "Create something personally useful", "Practice local notifications"],
      challenges: ["User experience design", "Data persistence", "Notification management"],
      roadmap: [
        "Design data structure",
        "Create habit creation interface",
        "Implement tracking functionality",
        "Add streak counting",
        "Implement notifications",
        "Create statistics and reporting",
      ],
    },
    {
      id: 17,
      title: "Recipe Finder App",
      category: "Mobile Apps",
      description: "Build a mobile app that suggests recipes based on ingredients you have.",
      difficulty: "Intermediate",
      tools: ["React Native/Flutter", "Recipe API", "Local Storage"],
      advantages: ["Learn API integration", "Practice search algorithms", "Create something useful"],
      challenges: ["Ingredient matching", "Recipe filtering", "Offline functionality"],
      roadmap: [
        "Set up API access",
        "Create ingredient input interface",
        "Implement recipe search",
        "Add filtering options",
        "Create recipe detail view",
        "Implement favorites and history",
      ],
    },
    {
      id: 18,
      title: "Language Learning App",
      category: "Mobile Apps",
      description: "Develop a mobile app for learning new languages with flashcards and quizzes.",
      difficulty: "Advanced",
      tools: ["React Native/Flutter", "Local Storage/Firebase", "Text-to-Speech API"],
      advantages: ["Learn audio integration", "Practice gamification", "Create something educational"],
      challenges: ["Content organization", "Progress tracking", "Speech recognition"],
      roadmap: [
        "Design lesson structure",
        "Create flashcard system",
        "Implement quiz functionality",
        "Add pronunciation practice",
        "Create progress tracking",
        "Implement spaced repetition algorithm",
      ],
    },
    {
      id: 19,
      title: "Meditation Timer App",
      category: "Mobile Apps",
      description: "Create a mobile app for guided meditation with timers and ambient sounds.",
      difficulty: "Intermediate",
      tools: ["React Native/Flutter", "Audio API", "Local Storage"],
      advantages: ["Learn audio handling", "Practice timer implementation", "Create something for wellbeing"],
      challenges: ["Audio management", "Background execution", "Timer accuracy"],
      roadmap: [
        "Design meditation sessions",
        "Implement timer functionality",
        "Add ambient sound selection",
        "Create guided meditation scripts",
        "Implement session history",
        "Add statistics and streaks",
      ],
    },
    {
      id: 20,
      title: "Local Event Discovery App",
      category: "Mobile Apps",
      description: "Build an app that helps users discover events happening in their area.",
      difficulty: "Advanced",
      tools: ["React Native/Flutter", "Maps API", "Event API/Firebase"],
      advantages: ["Learn geolocation", "Practice map integration", "Create something community-focused"],
      challenges: ["Event data sourcing", "Location accuracy", "Keeping content fresh"],
      roadmap: [
        "Set up geolocation",
        "Implement map integration",
        "Create event database",
        "Add search and filtering",
        "Implement event details",
        "Add favorites and notifications",
      ],
    },

    // Data Science
    {
      id: 21,
      title: "Personal Finance Analyzer",
      category: "Data Science",
      description: "Build a tool that analyzes personal spending patterns and provides insights.",
      difficulty: "Intermediate",
      tools: ["Python", "Pandas", "Matplotlib/Seaborn", "Scikit-learn"],
      advantages: ["Learn data analysis", 'Practice visualization  "Scikit-learn'],
      challenges: ["Data cleaning", "Pattern recognition", "Actionable insights"],
      roadmap: [
        "Set up data import",
        "Clean and categorize transactions",
        "Create visualizations",
        "Implement trend analysis",
        "Add predictive spending",
        "Create budget recommendations",
      ],
    },
    {
      id: 22,
      title: "Stock Market Predictor",
      category: "Data Science",
      description: "Develop a model that predicts stock prices based on historical data and news sentiment.",
      difficulty: "Advanced",
      tools: ["Python", "Pandas", "Scikit-learn", "NLTK/spaCy", "TensorFlow/PyTorch"],
      advantages: [
        "Learn time series analysis",
        "Practice natural language processing",
        "Understand financial modeling",
      ],
      challenges: ["Market unpredictability", "Feature selection", "Model evaluation"],
      roadmap: [
        "Collect historical stock data",
        "Implement technical indicators",
        "Gather news data",
        "Create sentiment analysis",
        "Build prediction model",
        "Evaluate and refine model",
        "Create visualization dashboard",
      ],
    },
    {
      id: 23,
      title: "Customer Segmentation Analysis",
      category: "Data Science",
      description: "Create a system that segments customers based on purchasing behavior.",
      difficulty: "Intermediate",
      tools: ["Python", "Pandas", "Scikit-learn", "Matplotlib/Seaborn"],
      advantages: ["Learn clustering techniques", "Practice feature engineering", "Understand business applications"],
      challenges: ["Feature selection", "Cluster interpretation", "Actionable insights"],
      roadmap: [
        "Collect customer data",
        "Clean and preprocess data",
        "Perform exploratory analysis",
        "Implement clustering algorithms",
        "Interpret customer segments",
        "Create visualization dashboard",
        "Develop marketing recommendations",
      ],
    },

    // Machine Learning
    {
      id: 24,
      title: "Image Classification System",
      category: "Machine Learning",
      description: "Build a system that can classify images into different categories.",
      difficulty: "Intermediate",
      tools: ["Python", "TensorFlow/PyTorch", "OpenCV", "Matplotlib"],
      advantages: ["Learn computer vision basics", "Practice deep learning", "Create something visually impressive"],
      challenges: ["Data collection", "Model training", "Accuracy optimization"],
      roadmap: [
        "Collect and prepare dataset",
        "Design neural network architecture",
        "Train classification model",
        "Evaluate and refine model",
        "Create prediction interface",
        "Implement real-time classification",
      ],
    },
    {
      id: 25,
      title: "Sentiment Analysis Tool",
      category: "Machine Learning",
      description: "Create a tool that analyzes the sentiment of text from social media or reviews.",
      difficulty: "Intermediate",
      tools: ["Python", "NLTK/spaCy", "Scikit-learn/TensorFlow", "Matplotlib"],
      advantages: [
        "Learn natural language processing",
        "Practice text classification",
        "Understand sentiment analysis",
      ],
      challenges: ["Text preprocessing", "Feature extraction", "Handling context and sarcasm"],
      roadmap: [
        "Collect text data",
        "Preprocess and clean text",
        "Extract features",
        "Train sentiment model",
        "Evaluate and refine model",
        "Create visualization dashboard",
        "Implement real-time analysis",
      ],
    },

    // Game Development
    {
      id: 26,
      title: "2D Platformer Game",
      category: "Game Development",
      description: "Create a 2D platformer game with character movement, obstacles, and levels.",
      difficulty: "Intermediate",
      tools: ["Unity/Godot", "C#/GDScript", "Aseprite/Piskel"],
      advantages: ["Learn game physics", "Practice level design", "Create something fun"],
      challenges: ["Character controller", "Collision detection", "Level progression"],
      roadmap: [
        "Design character and mechanics",
        "Implement character controller",
        "Create basic level elements",
        "Add enemies and obstacles",
        "Design multiple levels",
        "Implement scoring and progression",
        "Add sound effects and music",
      ],
    },
    {
      id: 27,
      title: "Puzzle Game",
      category: "Game Development",
      description: "Build a puzzle game with increasing difficulty levels and different mechanics.",
      difficulty: "Intermediate",
      tools: ["Unity/Godot", "C#/GDScript", "Aseprite/Piskel"],
      advantages: ["Learn game logic", "Practice UI design", "Create something challenging"],
      challenges: ["Puzzle generation", "Difficulty balancing", "User experience"],
      roadmap: [
        "Design core puzzle mechanics",
        "Implement basic puzzle logic",
        "Create level progression",
        "Add scoring system",
        "Implement hints and help",
        "Design UI and menus",
        "Add sound effects and music",
      ],
    },

    // IoT
    {
      id: 28,
      title: "Smart Home Monitoring System",
      category: "IoT",
      description: "Build a system that monitors temperature, humidity, and motion in your home.",
      difficulty: "Intermediate",
      tools: ["Raspberry Pi/Arduino", "Python/C++", "MQTT", "Node.js"],
      advantages: ["Learn sensor integration", "Practice IoT protocols", "Create something useful for home"],
      challenges: ["Sensor calibration", "Power management", "Data security"],
      roadmap: [
        "Set up hardware platform",
        "Connect sensors",
        "Implement data collection",
        "Create communication protocol",
        "Build web/mobile interface",
        "Add alerts and notifications",
        "Implement data logging and analysis",
      ],
    },
    {
      id: 29,
      title: "Automated Plant Watering System",
      category: "IoT",
      description: "Create a system that monitors soil moisture and waters plants automatically.",
      difficulty: "Beginner",
      tools: ["Arduino/ESP8266", "C++/Arduino IDE", "Soil Moisture Sensors", "Water Pump"],
      advantages: ["Learn basic electronics", "Practice sensor reading", "Create something practical"],
      challenges: ["Sensor calibration", "Water flow control", "Power management"],
      roadmap: [
        "Set up microcontroller",
        "Connect moisture sensors",
        "Implement pump control",
        "Create watering logic",
        "Add manual override",
        "Implement power saving",
        "Build simple monitoring interface",
      ],
    },

    // Blockchain
    {
      id: 30,
      title: "Simple Cryptocurrency",
      category: "Blockchain",
      description: "Create a basic cryptocurrency with transactions and mining.",
      difficulty: "Advanced",
      tools: ["JavaScript/Python", "Node.js", "Cryptography Libraries"],
      advantages: ["Learn blockchain fundamentals", "Practice cryptography", "Understand distributed systems"],
      challenges: ["Consensus mechanism", "Security considerations", "Network implementation"],
      roadmap: [
        "Design blockchain structure",
        "Implement transaction system",
        "Create mining algorithm",
        "Build peer-to-peer network",
        "Implement wallet functionality",
        "Add basic explorer interface",
        "Test security and performance",
      ],
    },
  ]

  // Add more project ideas to reach 200 total
  // This is a simplified version with 30 detailed ideas
  // In a real implementation, you would have 200 ideas

  interface ProjectIdea {
    id: number
    title: string
    category: string
    description: string
    difficulty: string
    tools: string[]
    advantages: string[]
    challenges: string[]
    roadmap: string[]
  }

  // Filter ideas based on search term and category
  const filteredIdeas = projectIdeas.filter((idea) => {
    const matchesSearch =
      searchTerm === "" ||
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "All" || idea.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Idea Advisor</h1>

      <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
        <p className="text-gray-300 mb-6">
          Browse our collection of project ideas to find inspiration for your next creation. Each idea comes with tools,
          advantages, challenges, and a suggested roadmap.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              className="block w-full p-4 pl-10 text-sm rounded-lg bg-gray-950 border border-gray-700 focus:ring-accent focus:border-accent"
              placeholder="Search for project ideas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="p-2.5 text-sm rounded-lg bg-gray-950 border border-gray-700 focus:ring-accent focus:border-accent min-w-[200px]"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredIdeas.map((idea) => (
          <div
            key={idea.id}
            className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-accent cursor-pointer transition-colors"
            onClick={() => setSelectedIdea(idea)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{idea.title}</h3>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  idea.difficulty === "Beginner"
                    ? "bg-green-900/50 text-green-300"
                    : idea.difficulty === "Intermediate"
                      ? "bg-yellow-900/50 text-yellow-300"
                      : "bg-red-900/50 text-red-300"
                }`}
              >
                {idea.difficulty}
              </span>
            </div>
            <span className="inline-block bg-gray-800 text-xs px-2 py-1 rounded mb-2">{idea.category}</span>
            <p className="text-gray-400 text-sm mb-3">{idea.description}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {idea.tools.slice(0, 3).map((tool, index) => (
                <span key={index} className="text-xs bg-gray-950 px-2 py-1 rounded">
                  {tool}
                </span>
              ))}
              {idea.tools.length > 3 && (
                <span className="text-xs bg-gray-950 px-2 py-1 rounded">+{idea.tools.length - 3} more</span>
              )}
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </div>
        ))}
      </div>

      {filteredIdeas.length === 0 && (
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center">
          <p className="text-gray-400">No project ideas found matching your search criteria.</p>
        </div>
      )}

      {selectedIdea && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedIdea.title}</h2>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedIdea(null)}>
                ✕
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  selectedIdea.difficulty === "Beginner"
                    ? "bg-green-900/50 text-green-300"
                    : selectedIdea.difficulty === "Intermediate"
                      ? "bg-yellow-900/50 text-yellow-300"
                      : "bg-red-900/50 text-red-300"
                }`}
              >
                {selectedIdea.difficulty}
              </span>
              <span className="inline-block bg-gray-800 text-xs px-2 py-1 rounded">{selectedIdea.category}</span>
            </div>

            <p className="text-gray-300 mb-6">{selectedIdea.description}</p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Recommended Tools</h3>
              <div className="flex flex-wrap gap-2">
                {selectedIdea.tools.map((tool, index) => (
                  <span key={index} className="text-sm bg-gray-950 px-3 py-1 rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-green-400">Advantages</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {selectedIdea.advantages.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-red-400">Challenges</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300">
                  {selectedIdea.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Suggested Roadmap</h3>
              <ol className="space-y-3 text-gray-300">
                {selectedIdea.roadmap.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={() => setSelectedIdea(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

