"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileType, Check } from "lucide-react"
import * as XLSX from "xlsx"
import { jsPDF } from "jspdf"
import "jspdf-autotable"

type UnitType = "length" | "weight" | "temperature"
type Unit = string
type ConversionFunction = (value: number, from: Unit, to: Unit) => number

interface UnitConverter {
  name: string
  units: Unit[]
  convert: ConversionFunction
}

type FileCategory = "document" | "image"

export default function Converters() {
  const [unitType, setUnitType] = useState<UnitType>("length")
  const [inputValue, setInputValue] = useState("")
  const [inputUnit, setInputUnit] = useState<Unit>("")
  const [outputUnit, setOutputUnit] = useState<Unit>("")
  const [result, setResult] = useState("")

  const [fileCategory, setFileCategory] = useState<FileCategory>("document")
  const [fileInputFormat, setFileInputFormat] = useState("")
  const [fileOutputFormat, setFileOutputFormat] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [conversionStatus, setConversionStatus] = useState<"idle" | "converting" | "done">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const unitConverters: Record<UnitType, UnitConverter> = {
    length: {
      name: "Length",
      units: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi"],
      convert: (value: number, from: Unit, to: Unit) => {
        // Conversion to base unit (m)
        const toBase: Record<Unit, (v: number) => number> = {
          mm: (v) => v / 1000,
          cm: (v) => v / 100,
          m: (v) => v,
          km: (v) => v * 1000,
          in: (v) => v * 0.0254,
          ft: (v) => v * 0.3048,
          yd: (v) => v * 0.9144,
          mi: (v) => v * 1609.34,
        }

        // Conversion from base unit (m)
        const fromBase: Record<Unit, (v: number) => number> = {
          mm: (v) => v * 1000,
          cm: (v) => v * 100,
          m: (v) => v,
          km: (v) => v / 1000,
          in: (v) => v / 0.0254,
          ft: (v) => v / 0.3048,
          yd: (v) => v / 0.9144,
          mi: (v) => v / 1609.34,
        }

        const baseValue = toBase[from](value)
        return fromBase[to](baseValue)
      },
    },
    weight: {
      name: "Weight",
      units: ["mg", "g", "kg", "oz", "lb", "ton"],
      convert: (value: number, from: Unit, to: Unit) => {
        // Simplified conversion logic
        const toBase: Record<Unit, (v: number) => number> = {
          mg: (v) => v / 1000000,
          g: (v) => v / 1000,
          kg: (v) => v,
          oz: (v) => v * 0.0283495,
          lb: (v) => v * 0.453592,
          ton: (v) => v * 907.185,
        }

        const fromBase: Record<Unit, (v: number) => number> = {
          mg: (v) => v * 1000000,
          g: (v) => v * 1000,
          kg: (v) => v,
          oz: (v) => v / 0.0283495,
          lb: (v) => v / 0.453592,
          ton: (v) => v / 907.185,
        }

        const baseValue = toBase[from](value)
        return fromBase[to](baseValue)
      },
    },
    temperature: {
      name: "Temperature",
      units: ["°C", "°F", "K"],
      convert: (value: number, from: Unit, to: Unit) => {
        if (from === "°C" && to === "°F") {
          return (value * 9) / 5 + 32
        } else if (from === "°F" && to === "°C") {
          return ((value - 32) * 5) / 9
        } else if (from === "°C" && to === "K") {
          return value + 273.15
        } else if (from === "K" && to === "°C") {
          return value - 273.15
        } else if (from === "°F" && to === "K") {
          return ((value - 32) * 5) / 9 + 273.15
        } else if (from === "K" && to === "°F") {
          return ((value - 273.15) * 9) / 5 + 32
        } else {
          return value // Same unit
        }
      },
    },
  }

  const fileFormats: Record<FileCategory, string[]> = {
    document: ["XLSX", "CSV", "PDF", "TXT"],
    image: ["JPG", "PNG", "GIF", "WEBP"],
  }

  const handleUnitConvert = () => {
    if (!inputValue || !inputUnit || !outputUnit) {
      setResult("Please fill all fields")
      return
    }

    const value = Number.parseFloat(inputValue)
    if (isNaN(value)) {
      setResult("Please enter a valid number")
      return
    }

    const converter = unitConverters[unitType]
    const convertedValue = converter.convert(value, inputUnit, outputUnit)
    setResult(`${value} ${inputUnit} = ${convertedValue.toFixed(4)} ${outputUnit}`)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleFileConvert = async () => {
    if (!selectedFile || !fileInputFormat || !fileOutputFormat) {
      alert("Please select a file and both input and output formats.")
      return
    }

    setConversionStatus("converting")

    try {
      let result: Blob | null = null

      if (fileCategory === "document") {
        result = await convertDocument(selectedFile, fileInputFormat, fileOutputFormat)
      } else if (fileCategory === "image") {
        result = await convertImage(selectedFile, fileInputFormat, fileOutputFormat)
      }

      if (result) {
        const url = URL.createObjectURL(result)
        const link = document.createElement("a")
        link.href = url
        link.download = `converted.${fileOutputFormat.toLowerCase()}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        throw new Error("Conversion failed")
      }

      setConversionStatus("done")
    } catch (error) {
      console.error("Conversion error:", error)
      alert("An error occurred during conversion. Please try again.")
      setConversionStatus("idle")
    }
  }

  const convertDocument = async (file: File, inputFormat: string, outputFormat: string): Promise<Blob | null> => {
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        const content = e.target?.result

        if (inputFormat === "XLSX" && outputFormat === "CSV") {
          const workbook = XLSX.read(content, { type: "binary" })
          const csvContent = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]])
          resolve(new Blob([csvContent], { type: "text/csv" }))
        } else if (inputFormat === "CSV" && outputFormat === "XLSX") {
          const workbook = XLSX.utils.book_new()
          const csvData = content as string
          const rows = csvData.split("\n").map((row) => row.split(","))
          const worksheet = XLSX.utils.aoa_to_sheet(rows)
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
          const xlsxContent = XLSX.write(workbook, { bookType: "xlsx", type: "binary" })
          resolve(
            new Blob([s2ab(xlsxContent)], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }),
          )
        } else if (outputFormat === "PDF") {
          const pdf = new jsPDF()
          pdf.text(content as string, 10, 10)
          resolve(pdf.output("blob"))
        } else if (outputFormat === "TXT") {
          resolve(new Blob([content as string], { type: "text/plain" }))
        } else {
          reject(new Error("Unsupported conversion"))
        }
      }

      reader.onerror = () => reject(new Error("File reading failed"))

      if (inputFormat === "XLSX") {
        reader.readAsBinaryString(file)
      } else {
        reader.readAsText(file)
      }
    })
  }

  const convertImage = async (file: File, inputFormat: string, outputFormat: string): Promise<Blob | null> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Failed to get canvas context"))
          return
        }
        ctx.drawImage(img, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error("Image conversion failed"))
          }
        }, `image/${outputFormat.toLowerCase()}`)
      }
      img.onerror = () => reject(new Error("Image loading failed"))
      img.src = URL.createObjectURL(file)
    })
  }

  // Helper function to convert string to ArrayBuffer
  const s2ab = (s: string) => {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Converters</h1>

      <Tabs defaultValue="units">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="units">Unit Converter</TabsTrigger>
          <TabsTrigger value="files">File Format Converter</TabsTrigger>
        </TabsList>

        <TabsContent value="units" className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Unit Converter</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Conversion Type</label>
              <select
                value={unitType}
                onChange={(e) => {
                  setUnitType(e.target.value as UnitType)
                  setInputUnit("")
                  setOutputUnit("")
                  setResult("")
                }}
                className="w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm"
              >
                {Object.entries(unitConverters).map(([key, { name }]) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Value</label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm"
                  placeholder="Enter value"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <select
                  value={inputUnit}
                  onChange={(e) => setInputUnit(e.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm"
                >
                  <option value="">Select unit</option>
                  {unitConverters[unitType].units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <select
                  value={outputUnit}
                  onChange={(e) => setOutputUnit(e.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm"
                >
                  <option value="">Select unit</option>
                  {unitConverters[unitType].units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleUnitConvert}>Convert</Button>
            </div>

            {result && (
              <div className="mt-4 p-4 bg-gray-950 rounded-lg border border-gray-800">
                <p className="text-lg font-medium text-accent">{result}</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="files" className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4">File Format Converter</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">File Type</label>
              <select
                className="w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm"
                value={fileCategory}
                onChange={(e) => {
                  setFileCategory(e.target.value as FileCategory)
                  setFileInputFormat("")
                  setFileOutputFormat("")
                }}
              >
                <option value="document">Document</option>
                <option value="image">Image</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">From Format</label>
                <select
                  value={fileInputFormat}
                  onChange={(e) => setFileInputFormat(e.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm"
                >
                  <option value="">Select format</option>
                  {fileFormats[fileCategory].map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">To Format</label>
                <select
                  value={fileOutputFormat}
                  onChange={(e) => setFileOutputFormat(e.target.value)}
                  className="w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm"
                >
                  <option value="">Select format</option>
                  {fileFormats[fileCategory].map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Upload File</label>
              <div
                className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-400">
                  {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedFile
                    ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                    : "Supported formats depend on conversion type"}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleFileConvert} disabled={conversionStatus !== "idle"}>
                {conversionStatus === "idle" && (
                  <>
                    <FileType className="mr-2 h-4 w-4" />
                    Convert File
                  </>
                )}
                {conversionStatus === "converting" && (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Converting...
                  </>
                )}
                {conversionStatus === "done" && (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Converted
                  </>
                )}
              </Button>
            </div>

            {conversionStatus === "done" && (
              <div className="mt-4 p-4 bg-gray-800 rounded-md">
                <p className="text-green-400 font-semibold">Conversion completed!</p>
                <p className="text-sm text-gray-300 mt-2">Your converted file has been downloaded.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

