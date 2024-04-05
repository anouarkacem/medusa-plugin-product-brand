import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { Image } from "@medusajs/medusa";
import { IsArray, IsOptional, IsString } from "class-validator";
import { validator } from "../../utils/validator";
import ProductBrandService from "../../services/product-brand";
import { ProductBrand } from "../../models/product-brand";

export default async function UpdateProductBrands(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { id } = req.params;

  const validated = await validator(AdminPostProductBrandReq, req.body);

  const productBrandService: ProductBrandService = req.scope.resolve(
    "productBrandService"
  );

  const brand = await productBrandService.update(id, validated);

  const rawBrand = await productBrandService.retrieve(brand.id, {
    select: defaultAdminProductBrandFields,
    relations: defaultAdminProductBrandRelations,
  });

  res.status(200).json({ brand: rawBrand });
}

export class AdminPostProductBrandReq {
  @IsString()
  @IsOptional()
  title?: string;

  @IsArray()
  @IsOptional()
  images?: Image[] | string[];

  @IsString()
  @IsOptional()
  thumbnail?: Image | string;

  @IsString()
  @IsOptional()
  handle?: string;
}

const defaultAdminProductBrandRelations = ["images"];

const defaultAdminProductBrandFields: (keyof ProductBrand)[] = [
  "id",
  "title",
  "handle",
  "images",
  "thumbnail",
  "created_at",
  "updated_at",
  "deleted_at",
];