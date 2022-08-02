/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { createMovieDto } from './dto/create-course.dto';
import { Movies } from './entity/movie.entity';
import { MovieInterface } from './interfaces/movie.interface';

@Injectable()
export class MoviesService {
  constructor(
    @Inject('MOVIES_REPOSITORY')
    private moviesRepository: Repository<Movies>,
    private readonly httpService: HttpService,  
  ) {}
  async getMovies() {
    let moviesData: MovieInterface[] = [];
    let moviesUrl: string[] = []
    let newData:MovieInterface[] = []
    const url = 'https://ghibliapi.herokuapp.com/films';
    const { data, status } = await this.httpService.get<MovieInterface[]>(url).toPromise();
    if (status === 200) {
      moviesData = data;
    }
    moviesData.map(movie => {
      moviesUrl.push(movie.url)
    })
    for(let i= 0; i < moviesUrl.length; i++){
      const {data} = await this.httpService.get(moviesUrl[i]).toPromise()
      newData.push(data)
      
    }
    newData.map(data => this.create({
      banner: data.movie_banner,
      description: data.description,
      director: data.director,
      producer: data.producer,
      title: data.title,
    }))
    return newData;
  }
  async paginate(options: IPaginationOptions): Promise<Pagination<Movies>> {
    return paginate<Movies>(this.moviesRepository, options);
  }
      
  async findOne(id: string): Promise<Movies[]> {
    return await this.moviesRepository.findBy({ id });
  }
  async create(createMovieDto: createMovieDto): Promise<Movies> {
    return await this.moviesRepository.save(createMovieDto);
  }
  async delete(id: string): Promise<void> {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new HttpException(`Movie ${id} not found`, HttpStatus.NOT_FOUND);
    }
    await this.moviesRepository.remove(movie);
  }
}
