import { IsString, IsNumber } from "../../../node_modules/class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from "./create-movie.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    //PartialType(CreateMovieDto) -> PartialType의 베이스타입 : CreateMovieDto
}