import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './Base.repository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ContactDocument, ContactInfo } from '../models/contact.model';

@Injectable()
export class ContactRepository extends BaseRepository<ContactDocument> {
  constructor(
    @InjectModel(ContactInfo.name)
    protected readonly contactModel: Model<ContactDocument>,
  ) {
    super(contactModel);
  }
}
