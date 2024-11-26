import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection, FilterQuery, UpdateQuery } from 'mongoose';
import { AbstractRepository } from 'src/common/db/abstract.repository';
import { User, UserDocument } from '../model/user.model';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(User.name) userModel: Model<UserDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }

  async findOne(filterQuery: FilterQuery<User>): Promise<User> {
    const document = await this.model.findOne(filterQuery, );

    if (!document) {
      throw new NotFoundException(
        `${this.model.collection.collectionName
          .toUpperCase()
          .slice(0, -1)} not found.`,
      );
    }

    return document;
  }

  async findOneWithoutCheck(filterQuery: FilterQuery<User>): Promise<User> {
    const document = await this.model.findOne(filterQuery);

    return document;
  }



  async findOneAndUpdate(
    filterQuery: FilterQuery<User>,
    update: UpdateQuery<User>,
  ) {
    const document = await this.model.findOneAndUpdate(
      { ...filterQuery, is_deleted: false },
      update,
      {
        new: true,
      },
    );

    if (!document) {
      throw new NotFoundException(
        `${this.model.collection.collectionName
          .toUpperCase()
          .slice(0, -1)} not found.`,
      );
    }

    return document;
  }

  async delete(filterQuery: FilterQuery<User>) {
    const document = await this.model.findOneAndDelete(filterQuery);

    if (!document) {
      throw new NotFoundException(
        `${this.model.collection.collectionName
          .toUpperCase()
          .slice(0, -1)} not found.`,
      );
    }
  }
}
