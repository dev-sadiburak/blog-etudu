"use client";

import { useState } from "react";

interface LabelInputProps {
  labels: string[];
  setLabels: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function LabelInput({ labels, setLabels }: LabelInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addLabel = () => {
    const value = inputValue.trim();
    if (!value) return;
    setLabels((prev) => [...prev, value]);
    setInputValue("");
  };

  const removeLabel = (label: string) => {
    setLabels((prev) => prev.filter((l) => l !== label));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* ❌ <form> kaldırıldı */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Label ekle..."
          className="border p-2 rounded flex-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addLabel();
            }
          }}
        />

        <button
          type="button"
          onClick={addLabel}
          className="bg-blue-600 text-white px-3 rounded"
        >
          Ekle
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {labels.map((label) => (
          <div
            key={label}
            className="flex items-center bg-gray-200 px-2 py-1 rounded"
          >
            <span>{label}</span>

            <button
              type="button"
              className="ml-2 text-red-500 font-bold"
              onClick={() => removeLabel(label)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
