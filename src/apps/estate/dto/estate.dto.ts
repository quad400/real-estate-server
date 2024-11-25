import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEstateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  price: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  details: string;
  
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  images: string[];
}

export class UpdateEstateDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  price?: string;
  
  @ApiProperty()
  @IsString()
  @IsOptional()
  location?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  details?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsArray()
  images?: string[];
}
