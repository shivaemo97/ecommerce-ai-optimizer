"use client";
import React, { useState } from 'react';
import { Upload, Copy, CheckCircle, Package, Zap } from 'lucide-react';

export default function EcommerceOptimizer() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setLoading(true);
      
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("/api/listing", { method: "POST", body: formData });
        const data = await res.json();
        setResult(data);
      } catch (err) {
        alert("Something went wrong!");
      } finally {
        setLoading(false);
      }
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-10">
      <header className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">AI Listing Optimizer</h1>
        <p className="text-slate-500 text-lg">Upload product photo & get top-ranking listings for Amazon, Flipkart & Meesho.</p>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Upload Box */}
        <div className="bg-white border-2 border-dashed border-blue-200 rounded-2xl p-10 text-center hover:border-blue-400 transition-all shadow-sm mb-10">
          <input type="file" id="upload" hidden onChange={handleUpload} accept="image/*" />
          <label htmlFor="upload" className="cursor-pointer flex flex-col items-center">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              <Upload className="text-blue-500 w-8 h-8" />
            </div>
            <span className="text-lg font-medium">Click to upload product image</span>
            <span className="text-sm text-slate-400 mt-1">PNG, JPG up to 10MB</span>
          </label>
        </div>

        {loading && (
          <div className="text-center py-10">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-blue-600 font-medium italic">AI is analyzing trends and generating SEO keywords...</p>
          </div>
        )}

        {result && (
          <div className="grid md:grid-cols-1 gap-8">
            {/* Amazon Section */}
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-400">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2"><Package className="text-orange-500" /> Amazon (A9 SEO)</h2>
                <button onClick={() => copyToClipboard(JSON.stringify(result.amazon), 'amz')} className="text-xs bg-slate-100 px-3 py-1 rounded hover:bg-slate-200">
                  {copied === 'amz' ? <CheckCircle size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <div className="space-y-4">
                <div><label className="text-xs font-bold text-slate-400 uppercase">Title</label><p className="bg-slate-50 p-3 rounded mt-1">{result.amazon.title}</p></div>
                <div><label className="text-xs font-bold text-slate-400 uppercase">Bullets</label>
                  <ul className="list-disc ml-5 mt-1 space-y-1 text-sm">{result.amazon.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>
                </div>
              </div>
            </div>

            {/* Flipkart & Meesho ... similar cards can be added here */}
          </div>
        )}
      </main>

      <footer className="text-center mt-20 text-slate-400 text-sm">
        Developed by Shivam Sharma | Fast & Secure Listing Tool
      </footer>
    </div>
  );
}
