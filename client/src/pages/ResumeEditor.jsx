import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { PDFDocument } from "pdf-lib";
import { useDropzone } from "react-dropzone";

const ResumeEditor = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Tiptap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<h2>Edit your resume</h2><p>Start typing...</p>",
  });

  // Dropzone
  const onDrop = (acceptedFiles) => {
    setUploadedFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // PDF Export
  const handleDownloadPDF = async () => {
    const doc = await PDFDocument.create();
    const page = doc.addPage([600, 800]);
    page.drawText(editor.getHTML().replace(/<[^>]+>/g, ""), { x: 50, y: 750 });
    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    setPdfUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Resume Editor</h1>
      <div className="mb-6">
        <div
          {...getRootProps()}
          className="border-2 border-dashed p-4 rounded-lg mb-4 cursor-pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop your file here...</p>
          ) : (
            <p>Upload a resume file (PDF/DOCX)</p>
          )}
        </div>
        {uploadedFile && <p>Uploaded: {uploadedFile.name}</p>}
      </div>
      <EditorContent
        editor={editor}
        className="border rounded-lg p-4 mb-6 bg-white"
      />
      <button
        onClick={handleDownloadPDF}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold mb-4"
      >
        Download PDF
      </button>
      {pdfUrl && (
        <a
          href={pdfUrl}
          download="resume.pdf"
          className="block mt-2 text-blue-700 underline"
        >
          Click here to download your PDF
        </a>
      )}
      <button
        onClick={() => navigate("/templates")}
        className="mt-6 bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold"
      >
        Back to Templates
      </button>
    </div>
  );
};

export default ResumeEditor;
