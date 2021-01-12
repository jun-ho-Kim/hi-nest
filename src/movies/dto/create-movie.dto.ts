import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateMovieDto {
    @IsString()
    readonly title: string;
    @IsNumber()
    readonly year: number;
    @IsOptional() //genres는 필수가 아니라는 validator
    @IsString({ each: true })
    readonly genres: string[];
}