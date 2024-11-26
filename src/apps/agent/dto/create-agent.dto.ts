import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAgentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  organization_name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  organization_phone: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  organization_image: string;
}
