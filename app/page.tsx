"use client";
import React, { useState } from 'react';
import { Upload, Copy, CheckCircle, ShoppingBag, Box, TrendingUp } from 'lucide-react';

export default function EcommerceOptimizer() {
  const [platform, setPlatform] = useState('amazon');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLoading(true);
      setResult(null);
      
      const formData = new FormData();
      formData.append("image", file);
      formData.append("platform", platform);

      try {
        const res = await fetch("/api/listing", { method: "POST", body: formData });
        const data = await res.json();
        setResult(data);
      } catch (err) {
        alert("Server limit reached or API Key error.");
      } finally {
        setLoading(false);
      }
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10">
      <header className="text-center mb-10 pt-8">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
          Optimize for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">#1 Rank</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
          Select platform, upload image, and generate SEO-rich listings instantly.
        </p>
      </header>

      {/* Platform Selection */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 mb-8 shadow-2xl">
        <h2 className="text-lg font-semibold mb-4 text-slate-200">1. Target Platform</h2>
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          <button onClick={() => setPlatform('amazon')} className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${platform === 'amazon' ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            <Box className="mb-2 w-6 h-6 md:w-8 md:h-8" />
            <span className="text-xs md:text-sm font-bold">Amazon</span>
          </button>
          <button onClick={() => setPlatform('flipkart')} className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${platform === 'flipkart' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            <ShoppingBag className="mb-2 w-6 h-6 md:w-8 md:h-8" />
            <span className="text-xs md:text-sm font-bold">Flipkart</span>
          </button>
          <button onClick={() => setPlatform('meesho')} className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${platform === 'meesho' ? 'bg-pink-500/10 border-pink-500 text-pink-400' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
            <TrendingUp className="mb-2 w-6 h-6 md:w-8 md:h-8" />
            <span className="text-xs md:text-sm font-bold">Meesho</span>
          </button>
        </div>
      </div>

      {/* Upload Box */}
      <div className="bg-slate-900 border border-slate-800 border-dashed rounded-3xl p-8 md:p-12 text-center relative hover:bg-slate-800/50 transition-all">
        <input type="file" id="upload" hidden onChange={handleUpload} accept="image/*" />
        <label htmlFor="upload" className="cursor-pointer flex flex-col items-center">
          <div className="bg-indigo-500 p-4 rounded-2xl mb-4 shadow-lg shadow-indigo-500/30">
            <Upload className="text-white w-8 h-8" />
          </div>
          <span className="text-xl font-semibold text-slate-200 mb-2">2. Upload Product Photo</span>
          <span className="text-xs text-slate-500">Formats: PNG, JPG</span>
        </label>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-12 text-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-400 font-medium text-sm">Analyzing {platform.toUpperCase()} algorithms...</p>
        </div>
      )}

      {/* Results */}
      {result && !result.error && (
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Generated Assets</h2>
          {Object.keys(result).map((key) => (
            <div key={key} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 w-1 h-full bg-indigo-500"></div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xs md:text-sm font-bold text-indigo-400 uppercase tracking-wider">{key.replace(/_/g, ' ')}</h3>
                <button onClick={() => copyText(Array.isArray(result[key]) ? result[key].join('\n') : result[key], key)} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-lg">
                  {copied === key ? <CheckCircle size={16} className="text-green-400" /> : <Copy size={16} />}
                </button>
              </div>
              {Array.isArray(result[key]) ? (
                <ul className="list-disc ml-5 space-y-2 text-sm text-slate-300">
                  {result[key].map((item: string, i: number) => <li key={i}>{item}</li>)}
                </ul>
              ) : (
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  {typeof result[key] === 'object' ? JSON.stringify(result[key]) : result[key]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      
      <footer className="text-center mt-20 text-slate-500 text-xs pb-4">
        Developed by Shivam Sharma | AI E-commerce Optimizer
      </footer>
    </div>
  );
}
