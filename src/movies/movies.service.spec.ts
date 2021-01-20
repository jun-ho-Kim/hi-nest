import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException, NotAcceptableException } from '../../node_modules/@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    // 테스트 할 때 마다 service.create를 매번 반복하고 싶지 않을 때
    // beforeEach 테스트 안에 movie를 생성해도 된다.
    // service.create({
    //   title: "Test Movie",
    //   genres: ['test'],
    //   year: 2000
    // });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //getAll()를 실행할 때 마다 Movie 배열을 return하는데 이걸 테스트해볼려고 한다.
  describe("getAll", () => {
    it("should return an array", () => {
      //NestJS의 장점 때문에 Movies.Service로 접근 할 수 있다.
      const result =service.getAll();
      //먼저 getAll()을 호출하고 result가 배열 인스턴스인지 테스트한다.
      expect(result).toBeInstanceOf(Array);
      //MovieService의 getAll()은 배열 return해야 한다.
    });
  });

  describe("getOne", () => {
    //getOne()을 위한 테스트용 movie를 생성해보자.
    it('should return a movie', () => {
    service.create({
      //id가 1인 moive
      title: "Test Movie",
      genres: ['test'],
      year: 2000
    });
    //id가 1인 movie로 getOne()을 호출한다.
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });

  describe("deleteOne", () => {
    it("delets a movie", () => {
      //우선 movie를 생성하는 것이 필요하니 service.create()를 사용
      service.create({
        title: 'Title Movie',
        genres: ['Test'],
        year: 2000
      });
      //생성된 movie를 테스트
      const beforeMovie = service.getAll().length;
      service.deleteOne(1);
      const afterDelte = service.getAll().length;
      expect(afterDelte).toBeLessThan(beforeMovie);
    })
    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });
  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Title Movie',
        genres: ['Test'],
        year: 2000
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Title Movie',
        genres: ['Test'],
        year: 2000
      });
      service.update(1, {title: 'update Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('update Test');
    });
    it('should throw a Not FoundException', () => {
      try {
        service.update(999, {});
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  })
});
