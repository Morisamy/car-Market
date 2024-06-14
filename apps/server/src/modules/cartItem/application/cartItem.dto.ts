import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CartItemCreateDto {
  @IsString()
  @IsOptional()
  cartId?: string

  @IsString()
  @IsOptional()
  carId?: string

  @IsString()
  @IsOptional()
  sparePartId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class CartItemUpdateDto {
  @IsString()
  @IsOptional()
  cartId?: string

  @IsString()
  @IsOptional()
  carId?: string

  @IsString()
  @IsOptional()
  sparePartId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
