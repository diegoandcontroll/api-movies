/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { createMovieDto } from './dto/create-course.dto';
import { Movies } from './entity/movie.entity';
import { MovieInterface } from './interfaces/movie.interface';

@Injectable()
export class MoviesService {
  constructor(
    @Inject('MOVIES_REPOSITORY')
    private photoRepository: Repository<Movies>,
    private readonly httpService: HttpService,
  ) {}
  async getMovies() {
    let moviesData: MovieInterface[] = [];
    const moviesUrl = []
    const url = 'https://ghibliapi.herokuapp.com/films?limit=10';
    const { data, status } = await this.httpService.get<MovieInterface[]>(url).toPromise();
    if (status === 200) {
      moviesData = data;
    }
    moviesData.map(movie => {
      moviesUrl.push(movie.url)
    })
    return moviesUrl
  }
  async getNewUrl(url: string): Promise<any> {
    const { data, status } = await this.httpService.get(url).toPromise();
    return data;
  }
  async findAll(): Promise<Movies[]> {
    return await this.photoRepository.find();
  }
  async findOne(id: string): Promise<Movies[]> {
    return await this.photoRepository.findBy({ id });
  }
  async create(createMovieDto: createMovieDto): Promise<Movies> {
    return await this.photoRepository.save(createMovieDto);
  }
  async delete(id: string): Promise<void> {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new HttpException(`Movie ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await this.photoRepository.remove(movie);
  }
}
