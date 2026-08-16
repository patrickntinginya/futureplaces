import type { Config, Context } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import {
  businesses,
  categories,
  businessImages,
  businessHours,
  businessServices,
  reviews,
} from "../../db/schema.js";

export default async (req: Request, context: Context) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { slug } = context.params;
  const [business] = await db
    .select({
      id: businesses.id,
      name: businesses.name,
      slug: businesses.slug,
      description: businesses.description,
      phone: businesses.phone,
      whatsapp: businesses.whatsapp,
      email: businesses.email,
      address: businesses.address,
      region: businesses.region,
      district: businesses.district,
      ward: businesses.ward,
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
    .where(eq(businesses.slug, slug));

  if (!business) {
    return Response.json({ error: "Business not found" }, { status: 404 });
  }

  const [images, hours, services, businessReviews] = await Promise.all([
    db.select().from(businessImages).where(eq(businessImages.businessId, business.id)),
    db.select().from(businessHours).where(eq(businessHours.businessId, business.id)),
    db.select().from(businessServices).where(eq(businessServices.businessId, business.id)),
    db.select().from(reviews).where(eq(reviews.businessId, business.id)),
  ]);

  return Response.json({ ...business, images, hours, services, reviews: businessReviews });
};

export const config: Config = {
  path: "/api/businesses/:slug",
};
