import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventStatus, EventType } from '../enums/event.enum';

export class EventDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly custodian: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(EventStatus)
  @ApiProperty()
  readonly status: EventStatus;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly location: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly condition: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(EventType)
  @ApiProperty()
  readonly eventType: EventType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly itemId: string;
}
