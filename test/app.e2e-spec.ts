import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true
        }),
    );
    await app.init();
  });
  //웹사이트를 방문하고
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

// moives의 endpoint
describe('/movie', () => {
  //모든 movies 목록을 가져오고
  it("GET", () => {
    //이 부분은 http://localhost:3000/ 같은 걸 안 쓰기 위해서 사용
    return request(app.getHttpServer())
      .get("/movies")
      .expect(200)
      .expect([])
  });
  //movie를 생성하고
  it('POST', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test',
        year: 2000,
        genres: ['test']
      })
      .expect(201)
  });
  //잘못된 정보로 movie를 생성해보려고 시도해보았다.
  it('POST 400', () => {
    return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test',
        year: 2000,
        genres: ['test'],
        other: 'thing'
      })
      .expect(400)
  });
  //모든 movies를 삭제해보려고 시도도 해봤다.
  it('DELETE', () => {
    return request(app.getHttpServer())
      .delete('/movies')
      .expect(404);
  })
})

describe('/movies/:id', () => {
  //id 1로 movie를 찾아보고
  it('GET, 200', () => {
    return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200);
  });
  //존재하지 않는 moive를 찾아보려고도 햇다.
  it('GET 404', () => {
    return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404);
  });
  //id 1인 movie를 업데이트하는 테스트
  it('PATCH 200', () => {
    return request(app.getHttpServer())
      .patch('/movies/1')
      .send({
        title: 'Update Title'
      })
      .expect(200);
  });
  //원한다면 존재하는 movie를 삭제하는 테스트
  it('DELETE 200', () => {
    return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
  });
});

});
