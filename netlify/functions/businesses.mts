import type { Config } from "@netlify/functions";
import { and, eq, ilike, or } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  businesses,
  categories,
  businessServices,
  verificationRequests,
} from "../../db/schema.js";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async (req: Request) => {
  if (req.method === "GET") {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const q = url.searchParams.get("q");
    const region = url.searchParams.get("region");
    const status = url.searchParams.get("status") || "verified";

    const conditions = [eq(businesses.status, status)];
    if (category && category !== "all") {
      const [cat] = await db.select().from(categories).where(eq(categories.slug, category));
      if (cat) conditions.push(eq(businesses.categoryId, cat.id));
    }
    if (region) conditions.push(eq(businesses.region, region));
    if (q) {
      conditions.push(
        or(
          ilike(businesses.name, `%${q}%`),
          ilike(businesses.description, `%${q}%`),
          ilike(businesses.address, `%${q}%`)
        )!
      );
    }

    const rows = await db
      .select({
        id: businesses.id,
        name: businesses.name,
        slug: businesses.slug,
        description: businesses.description,
        phone: businesses.phone,
        whatsapp: businesses.whatsapp,
        address: businesses.address,
        region: businesses.region,
        district: businesses.district,
        latitude: businesses.latitude,
        longitude: businesses.longitude,
        coverImage: businesses.coverImage,
        status: businesses.status,
        rating: businesses.rating,
        reviewCount: businesses.reviewCount,
        isMock: businesses.isMock,
        categorySlug: categories.slug,
        categoryName: categories.name,
      })
      .from(businesses)
      .leftJoin(categories, eq(businesses.categoryId, categories.id))
      .where(and(...conditions));

    return Response.json(rows);
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      const {
        name,
        categoryId,
        description,
        phone,
        whatsapp,
        email,
        address,
        region,
        district,
        ward,
        latitude,
        longitude,
        coverImage,
        services,
        ownerId,
      } = body;

      if (!name || !phone || !region) {
        return Response.json(
          { error: "Jina, namba ya simu na mkoa vinahitajika." },
          { status: 400 }
        );
      }

      const baseSlug = slugify(name);
      let slug = baseSlug;
      let attempt = 1;
      while (true) {
        const existing = await db.select().from(businesses).where(eq(businesses.slug, slug));
        if (existing.length === 0) break;
        attempt += 1;
        slug = `${baseSlug}-${attempt}`;
      }

      const [created] = await db
        .insert(businesses)
        .values({
          ownerId: ownerId || null,
          name,
          slug,
          categoryId: categoryId || null,
          description: description || "",
          phone,
          whatsapp: whatsapp || phone,
          email: email || null,
          address: address || null,
          region,
          district: district || null,
          ward: ward || null,
          latitude: latitude ?? null,
          longitude: longitude ?? null,
          coverImage: coverImage || null,
          status: "pending",
          isMock: false,
        })
        .returning();

      if (Array.isArray(services) && services.length > 0) {
        await db
          .insert(businessServices)
          .values(services.filter(Boolean).map((s: string) => ({ businessId: created.id, name: s })));
      }

      await db.insert(verificationRequests).values({
        businessId: created.id,
        submittedBy: ownerId || null,
        status: "pending",
      });

      return Response.json(created, { status: 201 });
    } catch (err) {
      return Response.json({ error: "Imeshindikana kusajili biashara." }, { status: 500 });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/businesses",
};
