import { Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { getOuterBindingIdentifiers } from '../../node_modules/@babel/types';
import { create } from 'domain';

@Controller('movies')
export class MoviesController {
    //비어있는 route
    @Get() 
    getAll() {
        return "this will return all movies"
    }

    @Get("/:id")
    getOne(@Param("id") movieId:string)  {
        return `This will return one movie id: ${movieId}`;
    }

    @Post()
    create() {
        return `This will create a movie`;
    }
    @Delete("/:id") 
    remove(@Param("id") movieId:string) {
        return `This will delte a movie with the id: ${movieId}`;
    }

    @Patch('/:id')
    Patch(@Param('id') movieId: string) {
        return `This will patch a movie with the id: ${movieId}`;
    }
    

}
