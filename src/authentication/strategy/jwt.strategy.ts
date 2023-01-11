import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( private config: ConfigService, @Inject('KnexConnection') private readonly knex) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: {sub: number, email: string}) {
    const user = await this.knex('users').column('id','name','balance', 'email','created_at','updated_at').where({id: payload.sub}).first()
    return user;
  }
}