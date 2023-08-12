import {
  IsBoolean,
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTask {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()  
  body: string;

   @IsBoolean()
  review: boolean;

  
}
