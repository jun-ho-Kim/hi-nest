import { Controller, Get, Param, Post, Delete, Patch, Body, Query } from '@nestjs/common';
import { getOuterBindingIdentifiers } from '../../node_modules/@babel/types';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
    //movieServie를 불러오는 코드
    constructor(private readonly moviesService:MoviesService) {}
    @Get() 
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }
    @Get('search')
    search(@Query("year") searchingYear:string) {
        return `We are searching for a movie made after: ${searchingYear}`;
    }
    
    @Get("/:id")
    getOne(@Param("id") movieId:number): Movie  {
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }
    
    @Post()
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    }
    @Delete("/:id") 
    remove(@Param("id") movieId:number) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    Patch(@Param('id') movieId: number, @Body() updateData) {
        return this.moviesService.update(movieId, updateData);
    }
    // '/search'가 아닌 'search' 로 사용가능 
    

}
