import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { createMovieDto } from './dto/create-course.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }
  @Get('/data')
  getMovies() {
    return this.moviesService.getMovies();
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
