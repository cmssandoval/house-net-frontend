import z from "zod";

export const addProduct = z.object({
  productName: z.string().min(1, 'Proporcione un nombre de producto'),
  category: z.string(),
  location: z.string(),
  stock: z.string().min(1, 'Indique la cantidad'),
  unit: z.string().min(1, 'Indique el tipo de unidad'),
});

export type AddProductFormData = z.infer<typeof addProduct>;