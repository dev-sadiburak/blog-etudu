"use client";

import { useState } from "react";
import LabelInput from "./LabelInput";

export default function FormClient({
  createPost,
}: {
  createPost: (formData: FormData) => void;
}) {
  const [labels, setLabels] = useState<string[]>([]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-10">
      <h2 className="text-xl font-semibold mb-4">Yeni Yazı Ekle</h2>
      <form action={createPost} className="flex flex-col gap-4">
        <input
          name="title"
          type="text"
          placeholder="Başlık"
          required
          className="p-3 border rounded text-black"
        />

        <textarea
          name="content"
          placeholder="İçerik..."
          required
          rows={3}
          className="p-3 border rounded text-black"
        />

        <LabelInput labels={labels} setLabels={setLabels} />

        {/* Label'ları server action'a JSON olarak aktarıyoruz */}
        <input
          type="hidden"
          name="labels"
          value={JSON.stringify(labels)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Gönder
        </button>
      </form>
    </div>
  );
}
