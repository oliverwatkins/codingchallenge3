import {Injectable, OnModuleInit} from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {

  testAppService(): string {
    return 'Test works...';
  }

  onModuleInit() {
    console.log(`Initialization...`);
  }
}