import { PartialType } from "@nestjs/mapped-types";
import { AddContactInfo } from "./addContactInfo.dto";

export class UpdateContactInfo extends PartialType(AddContactInfo) {}