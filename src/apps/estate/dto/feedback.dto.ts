import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rate: number;

  @ApiProperty()
  @IsString()
  comment?: string;
}

export class UpdateFeedbackDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  rate?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment?: string;
}
