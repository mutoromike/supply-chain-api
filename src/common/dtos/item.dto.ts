import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly sku: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  readonly quantity: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly color: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly manufacturer: string;
}
