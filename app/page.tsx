"use client";
import React, { useState } from 'react';
import { Upload, Copy, CheckCircle, Sparkles, Box, LayoutGrid } from 'lucide-react';

export default function EcommerceOptimizer() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic upload logic remains the same
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setLoading(true);
      setTimeout(() => {
        setResult({
          amazon: { title: "Generated SEO Title for Amazon", bullets: ["Premium Quality", "Durable Material", "Trendy Design", "Fast Shipping", "Best Value"] },
          flipkart: { title: "Catchy Title for Flipkart", highlights: ["Key Feature 1", "Key Feature 2", "Key Feature 3"] },
          meesho: { name: "Simple Meesho Name", description: "Soft and good quality for daily use.", tags: "trendy, new, dailywear" }
        });
        setLoading(false);
      }, 3000);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="min-h-screen text-white font-sans p-6 md:p-12 selection:bg-fuchsia-500 selection:text-white">
      <header className="max-w-4xl mx-auto text-center mb-16 pt-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
          <Sparkles className="w-4 h-4 text-fuchsia-400" />
          <span className="text-sm font-medium tracking-wide">Next-Gen Listing AI</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-blue-500">
          Rank Higher.<br />Sell Faster.
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light">
          Upload one product photo and let our AI generate perfectly optimized listings for Amazon, Flipkart, and Meesho in seconds.
        </p>
      </header>

      <main className="max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 text-center shadow-2xl hover:bg-white/15 transition-all duration-300 relative overflow-hidden group mb-12">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <input type="file" id="upload" hidden onChange={handleUpload} accept="image/*" />
          <label htmlFor="upload" className="cursor-pointer flex flex-col items-center relative z-10">
            <div className="bg-gradient-to-tr from-fuchsia-500 to-blue-500 p-5 rounded-2xl mb-6 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
              <Upload className="text-white w-10 h-10" />
            </div>
            <span className="text-2xl font-semibold mb-2">Drop your product image here</span>
            <span className="text-slate-400">or click to browse (PNG, JPG up to 10MB)</span>
          </label>
        </div>

        {loading && (
          <div className="text-center py-12 animate-pulse">
            <div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-lg text-fuchsia-300 font-medium tracking-wide">AI is analyzing trends & generating SEO magic...</p>
          </div>
        )}

        {result && (
          <div className="grid md:grid-cols-1 gap-8 fade-in">
            {/* Amazon Card */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3"><Box className="text-orange-400" /> Amazon A9 SEO</h2>
                <button onClick={() => copyToClipboard(JSON.stringify(result.amazon), 'amz')} className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors">
                  {copied === 'amz' ? <CheckCircle size={20} className="text-green-400" /> : <Copy size={20} className="text-slate-300" />}
                </button>
              </div>
              <div className="space-y-5">
                <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                  <label className="text-xs font-bold text-orange-300 uppercase tracking-wider block mb-2">Optimized Title</label>
                  <p className="text-slate-200">{result.amazon.title}</p>
                </div>
                <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                  <label className="text-xs font-bold text-orange-300 uppercase tracking-wider block mb-2">High-Converting Bullets</label>
                  <ul className="list-disc ml-5 space-y-2 text-slate-300">
                    {result.amazon.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            {/* Additional cards for Flipkart/Meesho will follow this exact premium styling */}
          </div>
        )}
      </main>

      <footer className="text-center mt-24 text-slate-500 text-sm pb-8">
        Developed by Shivam Sharma | High-Fidelity Listing Generator
      </footer>
    </div>
  );
}
