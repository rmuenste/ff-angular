import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';
import { IDataService } from './interfaces/data-service.interface';
import { ServerDataService } from './server-data.service';
import { StaticDataService } from './static-data.service';

export const DATA_SERVICE_TOKEN = new InjectionToken<IDataService>('DataService');

export function dataServiceFactory(
  serverDataService: ServerDataService,
  staticDataService: StaticDataService
): IDataService {
  console.log(`Using data source: ${environment.dataSource}`);
  
  switch (environment.dataSource) {
    case 'static':
      return staticDataService;
    case 'server':
    default:
      return serverDataService;
  }
}

export const DATA_SERVICE_PROVIDER = {
  provide: DATA_SERVICE_TOKEN,
  useFactory: dataServiceFactory,
  deps: [ServerDataService, StaticDataService]
};