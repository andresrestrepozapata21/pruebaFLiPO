// All imports neededs
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsString, MinLength } from "class-validator";
// I define DTO acepted for data transfer.
export class CreateTeacherDto {
    @IsString()
    @MinLength(1)
    name_teacher: string;

    @IsString()
    @MinLength(1)
    last_name_teacher: string;

    @IsEmail({}, { message: 'The email must be a valid email address' })
    email_teacher: string;

    @IsDate({ message: 'The creation date must be a valid date' })
    @Type(() => Date)
    date_created_teacher: Date;
}
