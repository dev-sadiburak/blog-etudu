// app/page.tsx
import prisma from "@/lib/db"; // Prisma client'ı import ediyoruz
import { revalidatePath } from "next/cache";
import FormClient from "./components/FormClient";

export default async function Home() {

  // 1. Veritabanındaki tüm postları çek (En yeniden eskiye)
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // 2. Server Action: Form gönderilince çalışacak sunucu fonksiyonu
  async function createPost(formData: FormData) {
    "use server"; // Bu fonksiyonun sunucuda çalışacağını belirtir

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const labels = JSON.parse(formData.get("labels") as string);

    // Veritabanına kayıt
    await prisma.post.create({
      data: {
        title,
        content,
        labels
      },
    });

    // Sayfayı yenile ki yeni veri ekranda görünsün
    revalidatePath("/");
  }

  return (
    <main className="p-10 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center">MongoDB Blog Etüdü</h1>
      
      {/* Formu client tarafına taşıyoruz */}
      <FormClient createPost={createPost} />

      {/* Listeleme Alanı */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold border-b pb-2">Son Yazılar</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">Henüz hiç yazı yok.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border p-4 rounded shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-lg text-blue-800">{post.title}</h3>
              <p className="text-gray-700 mt-2">{post.content}</p>
              {post.labels.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.labels.map((label, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 px-2 py-1 rounded text-sm"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}
              <small className="text-gray-400 block mt-2">
                {post.createdAt.toLocaleDateString('tr-TR')}
              </small>
            </div>
          ))
        )}
      </div>
    </main>
  );
}