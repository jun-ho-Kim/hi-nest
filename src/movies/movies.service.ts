import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    //(가짜)데이터베이스생성
    //movies의 타입을 array라고 하자.
    //Movie[]는 src/movies/entities/movie.entity.ts에서 가져옴 
    private movies: Movie[] = [];

    getAll(): Movie[] {
        //여기의 DB는 가짜 데이터베이스이다.
        //진짜 DB는 데이터베이스에 대한 Query가 올 것이다.
        return this.movies;
    }
    getOne(id:string): Movie {
        //parseInt(id) == +id
        const movie = this.movies.find(movie => movie.id === +id)
        if(!movie) {
            throw new NotAcceptableException(`Movie with ID ${id} not found`);
        }
        return movie;
    }

    deleteOne(id: string) {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id);
    }

    create(movieData) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }
    update(id:string, updateData) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData})
    } 
    
}
