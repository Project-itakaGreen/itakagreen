import { IsUrl } from 'class-validator';

export class DomainDto {
  @IsUrl({
    protocols: ['http','https'],
    require_protocol: true,
    allow_query_components: false
  })
  domain: string
}
