import { IsString } from 'class-validator';

export class createMovieDto {
  readonly id?: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly banner: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly director: string;

  @IsString()
  readonly producer: string;
}
