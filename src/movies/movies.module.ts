import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { moviesProviders } from './provider/movies.provider';

@Module({
  imports: [DbModule, HttpModule],
  controllers: [MoviesController],
  providers: [MoviesService, ...moviesProviders],
})
export class MoviesModule {}
