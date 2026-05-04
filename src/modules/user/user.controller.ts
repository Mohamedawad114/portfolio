import { Controller, HttpCode, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { Auth } from "src/common";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){
        
}
@Auth()
@HttpCode(200)
@Put('')
async updateData(@Body()data: UpdateUserDto){
    return await this.userService.updateUser(data);
    
    }
}