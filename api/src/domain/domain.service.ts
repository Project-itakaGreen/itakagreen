import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

import { Domain } from './../domain/entities/domain.entity';
import { ApiWebsitecarbonDto } from './dto/apiApiWebsitecarbon.dto';

import type { AxiosError } from 'axios';

@Injectable()
export class DomainService {
  private readonly logger: Logger = new Logger(DomainService.name);
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
    private readonly httpService: HttpService,
  ) {}

  /**
   * return the co2 emissions of a domain,
   * get this emissions from an API if it is not already stored in the database
   */
  async getOrCreate(domainName): Promise<Domain> {
    const domain: Domain = await this.domainRepository.findOne({
      where: {
        name: domainName,
      },
    });
    if (domain) return domain;

    let gco2ByGO = 0;
    try {
      const apiResponse: ApiWebsitecarbonDto = await this.queryEmissionsAPI(
        domainName,
      );
      const baseCalculeBytes: number = apiResponse.statistics.adjustedBytes;
      const co2PerBaseCalculeBytes: number =
        apiResponse.green === true
          ? apiResponse.statistics.co2.renewable.grams
          : apiResponse.statistics.co2.grid.grams;

      const bytesToGO = 1_073_741_824;
      gco2ByGO = (co2PerBaseCalculeBytes / baseCalculeBytes) * bytesToGO;
    } catch (error) {
      this.logger.warn(
        `error in fetching the consomation for the domain : "${domainName}"`,
      );
      gco2ByGO = 0.81 * 442; // https://sustainablewebdesign.org/calculating-digital-emissions/
    }

    const newDomain = new Domain();
    newDomain.name = domainName;
    newDomain.co2PerGO = gco2ByGO;

    const savedDomain: Domain = await this.domainRepository.save(newDomain);

    return savedDomain;
  }

  /**
   * Fetch the websitecarbon api to get the co2 emissions statistics of a website
   */
  async queryEmissionsAPI(domainName: string): Promise<ApiWebsitecarbonDto> {
    const encodedDomain: string = encodeURIComponent(domainName);
    const apiUrl = 'https://api.websitecarbon.com/site';
    const queryString = apiUrl + '?url=' + encodedDomain;

    const query$ = this.httpService
      .get(queryString, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip,deflate,compress',
        },
      })
      .pipe(
        catchError((error: AxiosError) => {
          this.logger.error('Error in Axios response');
          throw new Error(error.message);
        }),
      );
    const { data }: { data: ApiWebsitecarbonDto } = await firstValueFrom(
      query$,
    );

    if (!data) {
      throw new Error('Error while fetching data from the API');
    }
    return data;
  }
}
