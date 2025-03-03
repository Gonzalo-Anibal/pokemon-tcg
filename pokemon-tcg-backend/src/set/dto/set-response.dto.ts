import { Expose } from 'class-transformer';

export class SetResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  series: string;

  @Expose()
  printedTotal?: number;

  @Expose()
  total?: number;

  @Expose()
  ptcgoCode?: string;

  @Expose()
  releaseDate?: string;

  @Expose()
  updatedAt?: string;

  @Expose()
  symbolUrl?: string;

  @Expose()
  logoUrl?: string;
}
