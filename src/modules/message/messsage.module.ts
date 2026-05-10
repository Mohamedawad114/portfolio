import { Module } from "@nestjs/common";
import { EmailModule, MessageRepository } from "src/common";
import { messageModel } from "src/common/models/message.model";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";

@Module({
    imports: [messageModel, EmailModule],
    providers: [MessageRepository, MessageService],
    controllers:[MessageController]
})
export class MessageModule{}