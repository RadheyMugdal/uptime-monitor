import { z } from "zod";

export const createStatusPageSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase, numbers, and hyphens only"),
    description: z.string().optional(),
    monitorIds: z.array(z.string()),
});

export const updateStatusPageSchema = createStatusPageSchema.extend({
    id: z.string(),
});
