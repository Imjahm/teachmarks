import { OCRUpload } from "@/components/ocr/OCRUpload"
import { OCRResults } from "@/components/ocr/OCRResults"

const Upload = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">OCR Text Extraction</h1>
        <p className="text-muted-foreground">
          Upload images to extract text using OCR technology
        </p>
      </div>

      <OCRUpload routePath="/upload" />
      <OCRResults routePath="/upload" />
    </div>
  )
}

export default Upload