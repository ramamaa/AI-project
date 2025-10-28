"use client";

import { useState } from "react";

export const Gemini = () => {
  const [prompt, setPrompt] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);

  const extractIngredients = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIngredients("");

    try {
      const response = await fetch("/api/gemini-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log(data);

      if (data.text) {
        setIngredients(data.text);
      } else {
        alert("Failed to extract ingredients");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to extract ingredients");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-base font-bold mb-8">Chat assistant</h1>
      {ingredients && (
        <div className="mt-8 w-full max-w-2xl ">
          <h2 className="text-2xl font-semibold mb-4">
            Extracted Ingredients:
          </h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg overflow-scroll">
            <p className="text-lg whitespace-pre-wrap">{ingredients}</p>
          </div>
        </div>
      )}
      <form
        onSubmit={extractIngredients}
        className="w-full max-w-2xl flex gap-4"
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg h-10 overflow-scroll resize-y"
        />

        <button
          type="submit"
          disabled={loading || !prompt}
          className="w-10 h-10 bg-primary text-white p-4 rounded-full text-lg font-semibold hover:bg-primary disabled:bg-gray-300"
        >
          {loading ? "Extracting..." : "Extract Ingredients"}
        </button>
      </form>
    </div>
  );
};
