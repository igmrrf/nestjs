import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'mongoose';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private readonly logger = new Logger(MongooseConfigService.name);
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions():
    | Promise<MongooseModuleOptions>
    | MongooseModuleOptions {
    const uri = this.configService.get('NEST_MONGO_DB_URL');

    return {
      onConnectionCreate: (connection: Connection) => {
        const name = 'nest';
        connection.on('connected', () => this.logger.log('%s connected', name));
        connection.on('open', () => this.logger.log('%s open', name));
        connection.on('disconnected', () =>
          this.logger.log('%s disconnected', name),
        );
        connection.on('reconnected', () =>
          this.logger.log('%s reconnected', name),
        );
        connection.on('disconnecting', () =>
          this.logger.log('%s disconnecting', name),
        );
        return connection;
      },
      uri,
      // connectionName: databases.nest,
    };
  }
}
