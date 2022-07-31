import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { createMovieDto } from './dto/create-course.dto';
import { Movies } from './entity/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  // @Get()
  // findAll(options: IPaginationOptions) {
  //   return this.moviesService.findAll(options);
  // }
  @Get('/data')
  getMovies() {
    return this.moviesService.getMovies();
  }
  @Get()
  async index(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
  ): Promise<Pagination<Movies>> {
    limit = limit > 100 ? 100 : limit;
    return this.moviesService.paginate({ page, limit });
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMovieDto: createMovieDto) {
    return this.moviesService.create(createMovieDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }
  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.moviesService.delete(id);
  }
}
