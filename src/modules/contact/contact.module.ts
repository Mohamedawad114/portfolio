import { Module } from "@nestjs/common";
import { ContactController } from "./contact.controller";
import { contactModel, ContactRepository } from "src/common";
import { ContactService } from "./contact.service";

@Module({
  controllers: [ContactController],
    providers: [ContactRepository, ContactService],
    imports:[contactModel],
})
export class ContactInfoModule {}