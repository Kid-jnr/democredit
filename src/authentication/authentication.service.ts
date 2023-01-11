import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto/login-user.dto';

@Injectable()
export class AuthenticationService {
    constructor( @Inject('KnexConnection') private readonly knex, private jwt: JwtService, private config: ConfigService){}
    
    private saltOrRounds = 10;
    

    async registerUser(createUserDto: CreateUserDto){

        try {
            const user = await this.knex('users').insert({
                name: createUserDto.name,
                email: createUserDto.email,
                password: await bcrypt.hash(createUserDto.password,this.saltOrRounds),
                balance: 0
            })

            return {token: await this.signToken(user.id,user.email),message: 'Account created successfully', code: HttpStatus.CREATED}
        } catch (error) {
            throw new HttpException({message: error.sqlMessage}, HttpStatus.FORBIDDEN);
        }
        
    }

    async loginUser(loginUserDto: LoginUserDto ){
        const user = await this.knex('users').where({email: loginUserDto.email}).first()

        if(!user){
            throw new HttpException({message: "User does not exist"}, HttpStatus.NOT_FOUND)
        }

        if( !(await bcrypt.compare(loginUserDto.password, user.password))){
            throw new HttpException({message: "Wrong password"}, HttpStatus.BAD_REQUEST)
        }

        return {token: await this.signToken(user.id,user.email)}
    }

    signToken(userId: number, email: string): Promise<string>{
        const payload ={
            sub: userId,
            email
        }
        
        return this.jwt.signAsync(payload, {
            expiresIn: '1h',
            secret: this.config.get('JWT_SECRET')
        })
    }
}
