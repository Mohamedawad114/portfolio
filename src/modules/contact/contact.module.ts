import { Module } from "@nestjs/common";
import { ContactController } from "./contact.controller";
import { ContactRepository } from "src/common";
import { ContactService } from "./contact.service";
import { contactModel } from "src/common/models/contact.model";

@Module({
  controllers: [ContactController],
    providers: [ContactRepository, ContactService],
    imports:[contactModel],
})
export class ContactInfoModule {}