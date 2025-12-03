import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  applicant_name: string;

  @IsNotEmpty()
  @IsEmail()
  applicant_email: string;

  @IsNotEmpty()
  @IsString()
  permit_type: string;
}

