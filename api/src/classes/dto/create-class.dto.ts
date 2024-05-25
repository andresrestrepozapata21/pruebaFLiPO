// All imports neededs
import { Type } from "class-transformer";
import { IsDate, IsInt, IsString, MinLength } from "class-validator";
// I define DTO acepted for data transfer.
export class CreateClassDto {
    @IsString()
    @MinLength(1)
    name_class: string;

    @IsString()
    @MinLength(1)
    description_class: string;

    @IsDate({ message: 'The creation date must be a valid date' })
    @Type(() => Date)
    date_created_class: Date;
}
