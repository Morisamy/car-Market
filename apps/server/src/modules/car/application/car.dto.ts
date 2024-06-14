import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CarCreateDto {
  @IsString()
  @IsNotEmpty()
  make: string

  @IsString()
  @IsNotEmpty()
  model: string

  @IsNumber()
  @IsNotEmpty()
  year: number

  @IsNumber()
  @IsNotEmpty()
  pricePerDay: number

  @IsString()
  @IsOptional()
  ownerId?: string

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

export class CarUpdateDto {
  @IsString()
  @IsOptional()
  make?: string

  @IsString()
  @IsOptional()
  model?: string

  @IsNumber()
  @IsOptional()
  year?: number

  @IsNumber()
  @IsOptional()
  pricePerDay?: number

  @IsString()
  @IsOptional()
  ownerId?: string

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
