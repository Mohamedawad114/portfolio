import { PartialType } from "@nestjs/mapped-types";
import { AddContactInfo } from "./addcontactInfo.dto";

export class UpdateContactInfo extends PartialType(AddContactInfo) {}