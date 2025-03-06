"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code, Lightbulb, Clock, Calculator, Download } from "lucide-react"

export default function Home() {
  const features = [
    {
      title: "LaTeX Composer",
      description: "Create beautiful documents with our LaTeX-like composition system.",
      icon: <Code className="h-10 w-10 text-accent" />,
      href: "/latex",
    },
    {
      title: "Idea Advisor",
      description: "Get personalized advice, tools, and roadmaps for your projects.",
      icon: <Lightbulb className="h-10 w-10 text-accent" />,
      href: "/advisor",
    },
    {
      title: "Pomodoro Timer",
      description: "Boost your productivity with our customizable focus timer.",
      icon: <Clock className="h-10 w-10 text-accent" />,
      href: "/pomodoro",
    },
    {
      title: "Converters",
      description: "Convert units and file formats with ease.",
      icon: <Calculator className="h-10 w-10 text-accent" />,
      href: "/converters",
    },
    {
      title: "Software Guide",
      description: "Find the best software resources for any domain.",
      icon: <Download className="h-10 w-10 text-accent" />,
      href: "/software",
    },
  ]

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-8 py-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Welcome to <span className="text-accent glow-text">Nerdvana</span>
          </h1>
          <p className="text-xl text-gray-300">
            Your ultimate resource hub for all things geek. Boost productivity, find tools, and connect with like-minded
            enthusiasts.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="neon" size="lg" asChild>
              <Link href="/advisor">Explore Tools</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/latex">Start Creating</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/nerd.png"
              alt="Nerdvana - A digital paradise for geeks"
              width={400}
              height={400}
              className="rounded-full neon-border animate-fade "
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-12 text-center">Discover Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href} className="group">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 h-full transition-all duration-300 hover:border-accent hover:neon-border">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 rounded-lg p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to level up your geek game?</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Nerdvana provides all the tools and resources you need to excel in your technical endeavors.
        </p>
        <Button variant="neon" size="lg" asChild>
          <Link href="/advisor">Get Started</Link>
        </Button>
      </section>

      {/* CSS for Fade Animation */}
      <style jsx global>{`
        @keyframes fade {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-fade {
          animation: fade 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
