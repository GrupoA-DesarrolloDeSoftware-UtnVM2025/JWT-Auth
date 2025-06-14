import {IsNotEmpty, IsString} from "class-validator";

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty()
    code: string;
}