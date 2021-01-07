import { Controller, Get, Param, Post, Delete, Patch, Body, Query } from '@nestjs/common';
import { getOuterBindingIdentifiers } from '../../node_modules/@babel/types';
import { create } from 'domain';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

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
    getOne(@Param("id") movieId:string): Movie  {
        return this.moviesService.getOne(movieId);
    }
    
    @Post()
    create(@Body() movieData) {
        return this.moviesService.create(movieData);
    }
    @Delete("/:id") 
    remove(@Param("id") movieId:string) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    Patch(@Param('id') movieId: string, @Body() updateData) {
        return {
            updateMoive: movieId,
            ...updateData
        };
    }
    // '/search'가 아닌 'search' 로 사용가능 
    

}
