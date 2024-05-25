// All imports neededs
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString, MinLength } from "class-validator";
// I define DTO acepted for data transfer.
export class CreateStudentDto {
    @IsString()
    @MinLength(1)
    name_student: string;

    @IsString()
    @MinLength(1)
    last_name_student: string;

    @IsEmail({}, { message: 'The email must be a valid email address' })
    email_student: string;

    @IsDate({ message: 'The creation date must be a valid date' })
    @Type(() => Date)
    date_created_student: Date;
}
