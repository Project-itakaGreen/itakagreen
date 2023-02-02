import { IsInt, IsUrl } from 'class-validator';

export class CreateRecordDto {
  @IsUrl({
    protocols: ['http', 'https'],
    require_protocol: true,
    allow_query_components: false,
  })
  domainName: string;

  @IsInt()
  bytes: number;

  @IsInt()
  timeInterval: number;
}
