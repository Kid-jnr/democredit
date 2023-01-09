import { Controller, Post } from '@nestjs/common';

@Controller('authentication')
export class AuthenticationController {

    @Post('register')
    registerUser(){
        return "register route"
    }

    @Post('login')
    loginUser(){
        return "login user"
    }

    @Post('logout')
    logoutUser(){
        return "logout user"
    }
}
