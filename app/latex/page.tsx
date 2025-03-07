"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import FileSaver from "file-saver"

type TemplateName = "Academic Paper" | "Technical Report" | "Resume/CV" | "Presentation" | "Book" | "Thesis"

export default function LaTeXComposer() {
  const [latexInput, setLatexInput] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName | "">("")
  const [preview, setPreview] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const templates: Record<TemplateName, string> = {
    "Academic Paper": `\\documentclass{article}
\\usepackage[utf8]{inputenc}

\\title{Your Paper Title}
\\author{Your Name}

\\begin{document}

\\maketitle

\\begin{abstract}
Your abstract goes here...
\\end{abstract}

\\section{Introduction}
Your introduction goes here...

\\section{Methodology}
Your methodology goes here...

\\section{Results}
Your results goes here...

\\section{Conclusion}
Your conclusion goes here...

\\bibliographystyle{plain}
\\bibliography{references}

\\end{document}`,
    "Technical Report": `\\documentclass{report}
\\usepackage[utf8]{inputenc}

\\title{Your Technical Report Title}
\\author{Your Name}

\\begin{document}

\\maketitle

\\begin{abstract}
Your abstract goes here...
\\end{abstract}

\\chapter{Introduction}
Your introduction goes here...

\\chapter{Background}
Your background information goes here...

\\chapter{Methodology}
Your methodology goes here...

\\chapter{Results and Discussion}
Your results and discussion goes here...

\\chapter{Conclusion}
Your conclusion goes here...

\\bibliographystyle{plain}
\\bibliography{references}

\\end{document}`,
    "Resume/CV": `\\documentclass{article}
\\usepackage[utf8]{inputenc}

\\title{Your Name - Resume/CV}
\\author{}
\\date{}

\\begin{document}

\\maketitle

\\section{Education}
Your education details go here...

\\section{Experience}
Your work experience goes here...

\\section{Skills}
Your skills go here...

\\section{Projects}
Your projects go here...

\\end{document}`,
    Presentation: `\\documentclass{beamer}
\\usepackage[utf8]{inputenc}

\\title{Your Presentation Title}
\\author{Your Name}
\\institute{Your Institution}

\\begin{document}

\\frame{\\titlepage}

\\begin{frame}
\\frametitle{Introduction}
Your introduction goes here...
\\end{frame}

\\begin{frame}
\\frametitle{Main Content}
Your main content goes here...
\\end{frame}

\\begin{frame}
\\frametitle{Conclusion}
Your conclusion goes here...
\\end{frame}

\\end{document}`,
    Book: `\\documentclass{book}
\\usepackage[utf8]{inputenc}

\\title{Your Book Title}
\\author{Your Name}

\\begin{document}

\\maketitle

\\tableofcontents

\\chapter{Introduction}
Your introduction goes here...

\\chapter{Chapter 1}
Your first chapter goes here...

\\chapter{Chapter 2}
Your second chapter goes here...

\\chapter{Conclusion}
Your conclusion goes here...

\\bibliographystyle{plain}
\\bibliography{references}

\\end{document}`,
    Thesis: `\\documentclass{report}
\\usepackage[utf8]{inputenc}

\\title{Your Thesis Title}
\\author{Your Name}

\\begin{document}

\\maketitle

\\begin{abstract}
Your abstract goes here...
\\end{abstract}

\\tableofcontents

\\chapter{Introduction}
Your introduction goes here...

\\chapter{Literature Review}
Your literature review goes here...

\\chapter{Methodology}
Your methodology goes here...

\\chapter{Results and Discussion}
Your results and discussion goes here...

\\chapter{Conclusion}
Your conclusion goes here...

\\bibliographystyle{plain}
\\bibliography{references}

\\end{document}`,
  }

  const handleTemplateSelect = (template: TemplateName) => {
    setSelectedTemplate(template)
    setLatexInput(templates[template])
  }

  useEffect(() => {
    // Parse LaTeX content for preview
    const parseLatex = (latex: string) => {
      try {
        const lines = latex.split("\n")
        let parsedContent = ""
        let inDocument = false
        let inAbstract = false

        lines.forEach((line) => {
          if (line.includes("\\begin{document}")) {
            inDocument = true
          } else if (line.includes("\\end{document}")) {
            inDocument = false
          } else if (inDocument) {
            if (line.startsWith("\\title{")) {
              parsedContent += `<h1>${line.replace("\\title{", "").replace("}", "")}</h1>\n`
            } else if (line.startsWith("\\author{")) {
              parsedContent += `<p><strong>Author:</strong> ${line.replace("\\author{", "").replace("}", "")}</p>\n`
            } else if (line.startsWith("\\section{") || line.startsWith("\\chapter{")) {
              parsedContent += `<h2>${line.replace(/\\(section|chapter){/, "").replace("}", "")}</h2>\n`
            } else if (line.startsWith("\\subsection{")) {
              parsedContent += `<h3>${line.replace("\\subsection{", "").replace("}", "")}</h3>\n`
            } else if (line.startsWith("\\begin{abstract}")) {
              inAbstract = true
              parsedContent += '<div class="abstract"><h3>Abstract</h3>\n'
            } else if (line.startsWith("\\end{abstract}")) {
              inAbstract = false
              parsedContent += "</div>\n"
            } else if (line.startsWith("\\begin{frame}")) {
              parsedContent += '<div class="frame">\n'
            } else if (line.startsWith("\\end{frame}")) {
              parsedContent += "</div>\n"
            } else if (line.startsWith("\\frametitle{")) {
              parsedContent += `<h3>${line.replace("\\frametitle{", "").replace("}", "")}</h3>\n`
            } else if (line.trim() !== "") {
              parsedContent += `<p>${line}</p>\n`
            }
          }
        })

        setPreview(parsedContent)
        setError(null)
      } catch (err) {
        console.error("Error parsing LaTeX:", err)
        setError("An error occurred while parsing the LaTeX content.")
        setPreview("")
      }
    }

    parseLatex(latexInput)
  }, [latexInput])

  const handleSaveDraft = () => {
    try {
      localStorage.setItem("latexDraft", latexInput)
      alert("Draft saved successfully!")
    } catch (error) {
      console.error("Error saving draft:", error)
      alert("Failed to save draft. Please try again.")
    }
  }

  const handleExport = () => {
    try {
      const blob = new Blob([latexInput], { type: "text/plain;charset=utf-8" })
      FileSaver.saveAs(blob, "latex_document.tex")
    } catch (error) {
      console.error("Error exporting document:", error)
      alert("Failed to export document. Please try again.")
    }
  }

  return (
    <div className="max-w-full mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">LaTeX Document Composer</h1>

      <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
        <p className="text-gray-300 mb-4">
          Create professional LaTeX documents with our document composer. Perfect for academic papers, technical
          reports, theses, and more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Multiple document templates</li>
              <li>Real-time document preview</li>
              <li>Full LaTeX syntax support</li>
              <li>Easy-to-use interface</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Choose a template below</li>
              <li>Edit your content in the editor</li>
              <li>View your document preview in real-time</li>
              <li>Export when you're satisfied</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Templates</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {Object.keys(templates).map((template) => (
            <div
              key={template}
              className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-accent transition-colors"
            >
              <h3 className="font-medium mb-2">{template}</h3>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleTemplateSelect(template as TemplateName)}
              >
                Use Template
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-2xl font-bold mb-4">LaTeX Editor</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/2">
            <textarea
              className="w-full h-[calc(100vh-400px)] min-h-[400px] bg-gray-950 rounded-md p-4 border border-gray-800 text-gray-300 font-mono resize-none"
              value={latexInput}
              onChange={(e) => setLatexInput(e.target.value)}
              placeholder="Enter your LaTeX code here..."
            />
          </div>

          <div className="lg:w-1/2">
            <div className="bg-gray-950 rounded-md p-4 h-[calc(100vh-400px)] min-h-[400px] overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">Document Preview</h3>
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : preview ? (
                <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: preview }} />
              ) : (
                <p className="text-gray-500 italic">Document preview will appear here as you type...</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <Button onClick={handleExport}>Export</Button>
        </div>
      </div>
    </div>
  )
}

