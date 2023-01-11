import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto/login-user.dto';

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService){

    }

    @Post('register')
    registerUser(@Body() createUserDto: CreateUserDto){
        return this.authenticationService.registerUser(createUserDto)
    }

    @Post('login')
    loginUser(@Body() loginUserDto: LoginUserDto){
        return this.authenticationService.loginUser(loginUserDto)
    }
}
