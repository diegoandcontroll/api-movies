import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { createMovieDto } from './dto/create-course.dto';
import { Movies } from './entity/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @Inject('MOVIES_REPOSITORY')
    private photoRepository: Repository<Movies>,
  ) {}

  async findAll(): Promise<Movies[]> {
    return await this.photoRepository.find();
  }
  async findOne(id: string): Promise<Movies[]> {
    return await this.photoRepository.findBy({ id });
  }
  async create(createMovieDto: createMovieDto): Promise<Movies> {
    return await this.photoRepository.save(createMovieDto);
  }
}
