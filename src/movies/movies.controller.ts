import { Controller, Get, Param, Post, Delete, Patch, Body, Query } from '@nestjs/common';
import { getOuterBindingIdentifiers } from '../../node_modules/@babel/types';
import { create } from 'domain';

@Controller('movies')
export class MoviesController {
    //비어있는 route
    @Get() 
    getAll() {
        return "this will return all movies"
    }
    @Get('search')
    search(@Query("year") searchingYear:string) {
        return `We are searching for a movie made after: ${searchingYear}`;
    }
    
    @Get("/:id")
    getOne(@Param("id") movieId:string)  {
        return `This will return one movie id: ${movieId}`;
    }
    
    @Post()
    create(@Body() movieData) {
        return movieData;
    }
    @Delete("/:id") 
    remove(@Param("id") movieId:string) {
        return `This will delte a movie with the id: ${movieId}`;
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
