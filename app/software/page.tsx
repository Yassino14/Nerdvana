"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export default function SoftwareGuide() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = [
    "All",
    "Development",
    "Design",
    "Productivity",
    "Education",
    "Entertainment",
    "Security",
    "Utilities",
    "Communication",
    "AI & ML",
    "Data Science",
    "DevOps",
    "Database",
    "Mobile",
    "Game Dev",
  ]

  // 100 software tools with valid links
  const allTools = [
    // Development
    {
      id: "vscode",
      name: "Visual Studio Code",
      category: "Development",
      description: "Lightweight but powerful source code editor",
      website: "https://code.visualstudio.com/",
      free: true,
    },
    {
      id: "sublime",
      name: "Sublime Text",
      category: "Development",
      description: "Sophisticated text editor for code",
      website: "https://www.sublimetext.com/",
      free: false,
    },
    {
      id: "webstorm",
      name: "WebStorm",
      category: "Development",
      description: "Smart JavaScript IDE",
      website: "https://www.jetbrains.com/webstorm/",
      free: false,
    },
    {
      id: "pycharm",
      name: "PyCharm",
      category: "Development",
      description: "Python IDE for professional developers",
      website: "https://www.jetbrains.com/pycharm/",
      free: false,
    },
    {
      id: "intellij",
      name: "IntelliJ IDEA",
      category: "Development",
      description: "Java IDE for professionals",
      website: "https://www.jetbrains.com/idea/",
      free: false,
    },
    {
      id: "atom",
      name: "Atom",
      category: "Development",
      description: "A hackable text editor for the 21st Century",
      website: "https://atom.io/",
      free: true,
    },
    {
      id: "vim",
      name: "Vim",
      category: "Development",
      description: "Highly configurable text editor",
      website: "https://www.vim.org/",
      free: true,
    },
    {
      id: "git",
      name: "Git",
      category: "Development",
      description: "Distributed version control system",
      website: "https://git-scm.com/",
      free: true,
    },
    {
      id: "github",
      name: "GitHub",
      category: "Development",
      description: "Development platform inspired by the way you work",
      website: "https://github.com/",
      free: true,
    },
    {
      id: "gitlab",
      name: "GitLab",
      category: "Development",
      description: "DevOps platform",
      website: "https://about.gitlab.com/",
      free: true,
    },
    {
      id: "bitbucket",
      name: "Bitbucket",
      category: "Development",
      description: "Git solution for teams",
      website: "https://bitbucket.org/",
      free: true,
    },
    {
      id: "nodejs",
      name: "Node.js",
      category: "Development",
      description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
      website: "https://nodejs.org/",
      free: true,
    },
    {
      id: "npm",
      name: "npm",
      category: "Development",
      description: "Package manager for JavaScript",
      website: "https://www.npmjs.com/",
      free: true,
    },
    {
      id: "yarn",
      name: "Yarn",
      category: "Development",
      description: "Fast, reliable, and secure dependency management",
      website: "https://yarnpkg.com/",
      free: true,
    },
    {
      id: "docker",
      name: "Docker",
      category: "Development",
      description: "Container platform",
      website: "https://www.docker.com/",
      free: true,
    },

    // Design
    {
      id: "figma",
      name: "Figma",
      category: "Design",
      description: "Collaborative interface design tool",
      website: "https://www.figma.com/",
      free: true,
    },
    {
      id: "sketch",
      name: "Sketch",
      category: "Design",
      description: "Digital design toolkit",
      website: "https://www.sketch.com/",
      free: false,
    },
    {
      id: "adobexd",
      name: "Adobe XD",
      category: "Design",
      description: "UI/UX design and collaboration tool",
      website: "https://www.adobe.com/products/xd.html",
      free: false,
    },
    {
      id: "photoshop",
      name: "Adobe Photoshop",
      category: "Design",
      description: "Image editing and design software",
      website: "https://www.adobe.com/products/photoshop.html",
      free: false,
    },
    {
      id: "illustrator",
      name: "Adobe Illustrator",
      category: "Design",
      description: "Vector graphics editor",
      website: "https://www.adobe.com/products/illustrator.html",
      free: false,
    },
    {
      id: "indesign",
      name: "Adobe InDesign",
      category: "Design",
      description: "Desktop publishing software",
      website: "https://www.adobe.com/products/indesign.html",
      free: false,
    },
    {
      id: "blender",
      name: "Blender",
      category: "Design",
      description: "Free and open source 3D creation suite",
      website: "https://www.blender.org/",
      free: true,
    },
    {
      id: "gimp",
      name: "GIMP",
      category: "Design",
      description: "Free & open source image editor",
      website: "https://www.gimp.org/",
      free: true,
    },
    {
      id: "inkscape",
      name: "Inkscape",
      category: "Design",
      description: "Professional vector graphics editor",
      website: "https://inkscape.org/",
      free: true,
    },
    {
      id: "canva",
      name: "Canva",
      category: "Design",
      description: "Graphic design platform",
      website: "https://www.canva.com/",
      free: true,
    },
    {
      id: "zeplin",
      name: "Zeplin",
      category: "Design",
      description: "Connected space for product teams",
      website: "https://zeplin.io/",
      free: true,
    },
    {
      id: "invision",
      name: "InVision",
      category: "Design",
      description: "Digital product design platform",
      website: "https://www.invisionapp.com/",
      free: true,
    },
    {
      id: "framer",
      name: "Framer",
      category: "Design",
      description: "Interactive design tool",
      website: "https://www.framer.com/",
      free: true,
    },
    {
      id: "affinity",
      name: "Affinity Designer",
      category: "Design",
      description: "Professional graphic design software",
      website: "https://affinity.serif.com/en-us/designer/",
      free: false,
    },
    {
      id: "affinityphoto",
      name: "Affinity Photo",
      category: "Design",
      description: "Professional image editing software",
      website: "https://affinity.serif.com/en-us/photo/",
      free: false,
    },

    // Productivity
    {
      id: "notion",
      name: "Notion",
      category: "Productivity",
      description: "All-in-one workspace",
      website: "https://www.notion.so/",
      free: true,
    },
    {
      id: "obsidian",
      name: "Obsidian",
      category: "Productivity",
      description: "Knowledge base that works on local Markdown files",
      website: "https://obsidian.md/",
      free: true,
    },
    {
      id: "evernote",
      name: "Evernote",
      category: "Productivity",
      description: "Note-taking app",
      website: "https://evernote.com/",
      free: true,
    },
    {
      id: "onenote",
      name: "Microsoft OneNote",
      category: "Productivity",
      description: "Digital note-taking app",
      website: "https://www.microsoft.com/en-us/microsoft-365/onenote/",
      free: true,
    },
    {
      id: "todoist",
      name: "Todoist",
      category: "Productivity",
      description: "To-do list and task manager",
      website: "https://todoist.com/",
      free: true,
    },
    {
      id: "trello",
      name: "Trello",
      category: "Productivity",
      description: "Visual tool for organizing work",
      website: "https://trello.com/",
      free: true,
    },
    {
      id: "asana",
      name: "Asana",
      category: "Productivity",
      description: "Work management platform",
      website: "https://asana.com/",
      free: true,
    },
    {
      id: "clickup",
      name: "ClickUp",
      category: "Productivity",
      description: "Productivity platform",
      website: "https://clickup.com/",
      free: true,
    },
    {
      id: "monday",
      name: "Monday.com",
      category: "Productivity",
      description: "Work OS",
      website: "https://monday.com/",
      free: true,
    },
    {
      id: "slack",
      name: "Slack",
      category: "Communication",
      description: "Business communication platform",
      website: "https://slack.com/",
      free: true,
    },
    {
      id: "discord",
      name: "Discord",
      category: "Communication",
      description: "Voice, video and text communication service",
      website: "https://discord.com/",
      free: true,
    },
    {
      id: "zoom",
      name: "Zoom",
      category: "Communication",
      description: "Video conferencing service",
      website: "https://zoom.us/",
      free: true,
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      category: "Communication",
      description: "Business communication platform",
      website: "https://www.microsoft.com/en-us/microsoft-365/microsoft-teams/",
      free: true,
    },
    {
      id: "meet",
      name: "Google Meet",
      category: "Communication",
      description: "Video conferencing service",
      website: "https://meet.google.com/",
      free: true,
    },
    {
      id: "gmail",
      name: "Gmail",
      category: "Communication",
      description: "Email service",
      website: "https://mail.google.com/",
      free: true,
    },

    // Education
    {
      id: "anki",
      name: "Anki",
      category: "Education",
      description: "Powerful, intelligent flashcards",
      website: "https://apps.ankiweb.net/",
      free: true,
    },
    {
      id: "kahoot",
      name: "Kahoot",
      category: "Education",
      description: "Game-based learning platform",
      website: "https://kahoot.com/",
      free: true,
    },
    {
      id: "quizlet",
      name: "Quizlet",
      category: "Education",
      description: "Learning tools and flashcards",
      website: "https://quizlet.com/",
      free: true,
    },
    {
      id: "duolingo",
      name: "Duolingo",
      category: "Education",
      description: "Language learning platform",
      website: "https://www.duolingo.com/",
      free: true,
    },
    {
      id: "khan",
      name: "Khan Academy",
      category: "Education",
      description: "Free online courses",
      website: "https://www.khanacademy.org/",
      free: true,
    },
    {
      id: "coursera",
      name: "Coursera",
      category: "Education",
      description: "Online learning platform",
      website: "https://www.coursera.org/",
      free: true,
    },
    {
      id: "udemy",
      name: "Udemy",
      category: "Education",
      description: "Online learning and teaching marketplace",
      website: "https://www.udemy.com/",
      free: false,
    },
    {
      id: "edx",
      name: "edX",
      category: "Education",
      description: "Online courses from universities",
      website: "https://www.edx.org/",
      free: true,
    },
    {
      id: "brilliant",
      name: "Brilliant",
      category: "Education",
      description: "Learn to think",
      website: "https://brilliant.org/",
      free: false,
    },
    {
      id: "wolfram",
      name: "Wolfram Alpha",
      category: "Education",
      description: "Computational intelligence",
      website: "https://www.wolframalpha.com/",
      free: true,
    },

    // Entertainment
    {
      id: "spotify",
      name: "Spotify",
      category: "Entertainment",
      description: "Digital music service",
      website: "https://www.spotify.com/",
      free: true,
    },
    {
      id: "netflix",
      name: "Netflix",
      category: "Entertainment",
      description: "Streaming service",
      website: "https://www.netflix.com/",
      free: false,
    },
    {
      id: "youtube",
      name: "YouTube",
      category: "Entertainment",
      description: "Video sharing platform",
      website: "https://www.youtube.com/",
      free: true,
    },
    {
      id: "twitch",
      name: "Twitch",
      category: "Entertainment",
      description: "Live streaming platform",
      website: "https://www.twitch.tv/",
      free: true,
    },
    {
      id: "steam",
      name: "Steam",
      category: "Entertainment",
      description: "Video game digital distribution service",
      website: "https://store.steampowered.com/",
      free: true,
    },
    {
      id: "epicgames",
      name: "Epic Games Store",
      category: "Entertainment",
      description: "Digital video game storefront",
      website: "https://www.epicgames.com/store/",
      free: true,
    },
    {
      id: "gog",
      name: "GOG",
      category: "Entertainment",
      description: "Digital distribution platform",
      website: "https://www.gog.com/",
      free: true,
    },
    {
      id: "hulu",
      name: "Hulu",
      category: "Entertainment",
      description: "Streaming service",
      website: "https://www.hulu.com/",
      free: false,
    },
    {
      id: "disneyplus",
      name: "Disney+",
      category: "Entertainment",
      description: "Streaming service",
      website: "https://www.disneyplus.com/",
      free: false,
    },
    {
      id: "amazonprime",
      name: "Amazon Prime Video",
      category: "Entertainment",
      description: "Streaming service",
      website: "https://www.amazon.com/Prime-Video/",
      free: false,
    },

    // Security
    {
      id: "lastpass",
      name: "LastPass",
      category: "Security",
      description: "Password manager",
      website: "https://www.lastpass.com/",
      free: true,
    },
    {
      id: "1password",
      name: "1Password",
      category: "Security",
      description: "Password manager",
      website: "https://1password.com/",
      free: false,
    },
    {
      id: "bitwarden",
      name: "Bitwarden",
      category: "Security",
      description: "Open source password manager",
      website: "https://bitwarden.com/",
      free: true,
    },
    {
      id: "nordvpn",
      name: "NordVPN",
      category: "Security",
      description: "Virtual private network service",
      website: "https://nordvpn.com/",
      free: false,
    },
    {
      id: "expressvpn",
      name: "ExpressVPN",
      category: "Security",
      description: "Virtual private network service",
      website: "https://www.expressvpn.com/",
      free: false,
    },
    {
      id: "malwarebytes",
      name: "Malwarebytes",
      category: "Security",
      description: "Anti-malware software",
      website: "https://www.malwarebytes.com/",
      free: true,
    },
    {
      id: "avast",
      name: "Avast",
      category: "Security",
      description: "Antivirus software",
      website: "https://www.avast.com/",
      free: true,
    },
    {
      id: "bitdefender",
      name: "Bitdefender",
      category: "Security",
      description: "Antivirus software",
      website: "https://www.bitdefender.com/",
      free: false,
    },
    {
      id: "kaspersky",
      name: "Kaspersky",
      category: "Security",
      description: "Antivirus software",
      website: "https://www.kaspersky.com/",
      free: false,
    },
    {
      id: "authy",
      name: "Authy",
      category: "Security",
      description: "Two-factor authentication app",
      website: "https://authy.com/",
      free: true,
    },
    {
      id: "haveibeenpwned",
      name: "Have I Been Pwned",
      category: "Security",
      description: "Data breach search engine",
      website: "https://haveibeenpwned.com/",
      free: true,
    },

    // Utilities
    {
      id: "obs",
      name: "OBS Studio",
      category: "Utilities",
      description: "Free and open source software for video recording and live streaming",
      website: "https://obsproject.com/",
      free: true,
    },
    {
      id: "7zip",
      name: "7-Zip",
      category: "Utilities",
      description: "File archiver",
      website: "https://www.7-zip.org/",
      free: true,
    },
    {
      id: "winrar",
      name: "WinRAR",
      category: "Utilities",
      description: "File archiver",
      website: "https://www.win-rar.com/",
      free: false,
    },
    {
      id: "ccleaner",
      name: "CCleaner",
      category: "Utilities",
      description: "System optimization tool",
      website: "https://www.ccleaner.com/",
      free: true,
    },
    {
      id: "teamviewer",
      name: "TeamViewer",
      category: "Utilities",
      description: "Remote access and control software",
      website: "https://www.teamviewer.com/",
      free: true,
    },
    {
      id: "anydesk",
      name: "AnyDesk",
      category: "Utilities",
      description: "Remote desktop software",
      website: "https://anydesk.com/",
      free: true,
    },
    {
      id: "rufus",
      name: "Rufus",
      category: "Utilities",
      description: "USB formatting utility",
      website: "https://rufus.ie/",
      free: true,
    },
    {
      id: "etcher",
      name: "Etcher",
      category: "Utilities",
      description: "USB image writer",
      website: "https://www.balena.io/etcher/",
      free: true,
    },
    {
      id: "handbrake",
      name: "HandBrake",
      category: "Utilities",
      description: "Open source video transcoder",
      website: "https://handbrake.fr/",
      free: true,
    },
    {
      id: "vlc",
      name: "VLC Media Player",
      category: "Utilities",
      description: "Free and open source cross-platform multimedia player",
      website: "https://www.videolan.org/vlc/",
      free: true,
    },

    // AI & ML
    {
      id: "tensorflow",
      name: "TensorFlow",
      category: "AI & ML",
      description: "Open source machine learning framework",
      website: "https://www.tensorflow.org/",
      free: true,
    },
    {
      id: "pytorch",
      name: "PyTorch",
      category: "AI & ML",
      description: "Open source machine learning framework",
      website: "https://pytorch.org/",
      free: true,
    },
    {
      id: "jupyter",
      name: "Jupyter Notebook",
      category: "AI & ML",
      description: "Web application for creating and sharing documents with live code",
      website: "https://jupyter.org/",
      free: true,
    },
    {
      id: "colab",
      name: "Google Colab",
      category: "AI & ML",
      description: "Free cloud service for machine learning",
      website: "https://colab.research.google.com/",
      free: true,
    },
    {
      id: "kaggle",
      name: "Kaggle",
      category: "AI & ML",
      description: "Online community of data scientists and machine learning practitioners",
      website: "https://www.kaggle.com/",
      free: true,
    },
    {
      id: "huggingface",
      name: "Hugging Face",
      category: "AI & ML",
      description: "AI community building the future",
      website: "https://huggingface.co/",
      free: true,
    },
    {
      id: "openai",
      name: "OpenAI",
      category: "AI & ML",
      description: "AI research laboratory",
      website: "https://openai.com/",
      free: false,
    },
    {
      id: "chatgpt",
      name: "ChatGPT",
      category: "AI & ML",
      description: "AI chatbot",
      website: "https://chat.openai.com/",
      free: true,
    },
    {
      id: "midjourney",
      name: "Midjourney",
      category: "AI & ML",
      description: "AI image generation",
      website: "https://www.midjourney.com/",
      free: false,
    },
    {
      id: "stability",
      name: "Stable Diffusion",
      category: "AI & ML",
      description: "AI image generation",
      website: "https://stability.ai/",
      free: true,
    },

    // Data Science
    {
      id: "tableau",
      name: "Tableau",
      category: "Data Science",
      description: "Data visualization software",
      website: "https://www.tableau.com/",
      free: false,
    },
    {
      id: "powerbi",
      name: "Power BI",
      category: "Data Science",
      description: "Business analytics service",
      website: "https://powerbi.microsoft.com/",
      free: true,
    },
    {
      id: "excel",
      name: "Microsoft Excel",
      category: "Data Science",
      description: "Spreadsheet software",
      website: "https://www.microsoft.com/en-us/microsoft-365/excel",
      free: false,
    },
    {
      id: "r",
      name: "R",
      category: "Data Science",
      description: "Programming language for statistical computing",
      website: "https://www.r-project.org/",
      free: true,
    },
    {
      id: "rstudio",
      name: "RStudio",
      category: "Data Science",
      description: "IDE for R",
      website: "https://www.rstudio.com/",
      free: true,
    },
    {
      id: "pandas",
      name: "Pandas",
      category: "Data Science",
      description: "Data analysis and manipulation library",
      website: "https://pandas.pydata.org/",
      free: true,
    },
    {
      id: "numpy",
      name: "NumPy",
      category: "Data Science",
      description: "Scientific computing library",
      website: "https://numpy.org/",
      free: true,
    },
    {
      id: "matplotlib",
      name: "Matplotlib",
      category: "Data Science",
      description: "Visualization library",
      website: "https://matplotlib.org/",
      free: true,
    },
    {
      id: "seaborn",
      name: "Seaborn",
      category: "Data Science",
      description: "Statistical data visualization",
      website: "https://seaborn.pydata.org/",
      free: true,
    },
    {
      id: "scikit",
      name: "Scikit-learn",
      category: "Data Science",
      description: "Machine learning library",
      website: "https://scikit-learn.org/",
      free: true,
    },
  ]

  const [tools, setTools] = useState(allTools)

  // Filter tools based on search term and category
  useEffect(() => {
    let filtered = allTools

    if (searchTerm) {
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory)
    }

    setTools(filtered)
  }, [searchTerm, selectedCategory])

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Software Guide</h1>

      <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
        <p className="text-gray-300 mb-6">
          Find the best software for any domain. Our curated list helps you discover tools for development, design,
          productivity, and more.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              className="block w-full p-4 pl-10 text-sm rounded-lg bg-gray-950 border border-gray-700 focus:ring-accent focus:border-accent"
              placeholder="Search for software, tools, or categories..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div key={tool.id} className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{tool.name}</h3>
                <span className="inline-block bg-gray-800 text-xs px-2 py-1 rounded mt-1 mb-2">{tool.category}</span>
              </div>
              {tool.free && <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">Free</span>}
            </div>
            <p className="text-gray-400 text-sm mb-3">{tool.description}</p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={tool.website} target="_blank" rel="noopener noreferrer">
                Visit Website
              </Link>
            </Button>
          </div>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center">
          <p className="text-gray-400">No tools found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}

