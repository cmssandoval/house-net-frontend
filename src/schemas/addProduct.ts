import z from "zod";

export const addProduct = z.object({
  productName: z.string().min(1, 'Proporcione un nombre de producto'),
  category: z.string().min(1, 'Seleccione una categoría'),
  location: z.string().min(1, 'Seleccione una ubicación'),
  stock: z.string().regex(/^[1-9]\d*$/, 'Indique una cantidad entera mayor que cero'),
  unit: z.string().min(1, 'Indique el tipo de unidad'),
});

export type AddProductFormData = z.infer<typeof addProduct>;