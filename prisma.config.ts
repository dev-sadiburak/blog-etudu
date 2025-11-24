import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: "mongodb+srv://admin:pyrve2-siHryp-dacryc@cluster0.coewj47.mongodb.net/blog-etudu?appName=Cluster0"
  },
});
