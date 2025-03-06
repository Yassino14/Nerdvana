"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitResult({
        success: true,
        message: "Your message has been sent successfully! We'll get back to you soon.",
      })

      // Reset form
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact the Developer</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-300 mb-6">
              Have questions, suggestions, or found a bug? We'd love to hear from you!
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-accent mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-gray-400">louati.yessine1@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-accent mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-gray-400">+2 (16) 55740483</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-accent mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-sm text-gray-400">
                    Bizerte , 7000
                    <br />
                    Tunisia
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Connect With Us</h2>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/Yassino14"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent"
              >
                <Github size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/yassine-louati-9629a219a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent"
              >
                <Linkedin size={24} />
              </Link>
              <Link
                href="https://yassinolouati.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent"
              >
                <Globe size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Send a Message</h2>

            {submitResult ? (
              <div
                className={`p-4 rounded-md mb-6 ${
                  submitResult.success ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
                }`}
              >
                {submitResult.message}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-950 border-gray-700"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-950 border-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="bg-gray-950 border-gray-700"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="bg-gray-950 border-gray-700"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

