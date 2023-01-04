import { Injectable } from '@nestjs/common';

@Injectable()
export class ConsoService {

    getTotal(): string {
        return 'Detail du total!';
    }

    getDay(): string {
        return 'Detail du jour!';
    }

    getDomain(): string {
        return 'Detail du domaine!';
    }

}
