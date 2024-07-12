import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  users:any;
  counter:number;
  constructor(private readonly appService: AppService) {
    this.counter=0;
    this.users = [
      {
        id:1,
        name:"a",
        surname:"a",
        age:18,
      },
      {
        id:2,
        name:"b",
        surname:"b",
        age:48,
      },
      {
        id:3,
        name:"c",
        surname:"c",
        age:25,
      },
      {
        id:4,
        name:"d",
        surname:"d",
        age:19,
      }
    ]
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('api/test')
  createUser(@Body() userData:any):any{
    return userData.number *2;
  }
  @Post('api/users')
  insertUser(@Body() data:any):any{
    const {name,surname,age}= data;
    if(!data?.name||!data?.surname||!data?.age){
      throw new BadRequestException("Invalid data");
    }

    const newUser = {
      id: this.counter+1,
      name: name,
      surname:surname,
      age:age
    }
    this.counter++;
    this.users.push(newUser);
    return this.users;
  }
  @Get('/api/pokemon/:name')
  async getPokemon(@Param('name') pokemon):Promise <any>{
    //asi muestra un observable de RxJS
    console.log(this.appService.getPokemon('ditto'))
    const {data} = await firstValueFrom(
      await this.appService.getPokemon(pokemon),
    );
    return data;
}
@Get('/api/compare/:firstPokemon/:secondPokemon')
async comparePokemon(@Param('firstPokemon') first: string, @Param('secondPokemon') second: string): Promise<any> {
  const data1 = await firstValueFrom(this.appService.getPokemon(first));
  const data2 = await firstValueFrom(this.appService.getPokemon(second));

  const{data}=data1
  console.log(data)
return data;
  // const filterdata1 = {
  //   abilities: abilities,
  //   name: data1.name,
  //   stats: data1.stats
  // };

  // const filterdata2 = {
  //   abilities: data2.abilities,
  //   name: data2.name,
  //   stats: data2.stats
  // };

  // return { first: filterdata1, second: filterdata2 };
}
}

//Devuelve un status code
//En Backend es importante la performance -> Response Time
//Peso de la Respuesta
//Status Code
//2xx -> Todo esta bien 
//3xx -> Redirecion (permanente temporal)
//4xx -> Error del Cliente (Cliente Macaco, software del cliente)
//5xx -> Error del Servidor (Problema propio)

//Error handling -> Se debe pensar en todo lo que puede causar errores en la API
//En nest esta estandarizado BadRequestException tiene un parametro opcional 
//Nest tiene muchos


//la data vive en la memoria



//Consumiendo una API desde nuestra API

//Molitico vs Microservicios
//Monolitico -> us solo proyecto -> Si se rompe algo el resto se daña
//Microservecions -> HTTP Requests entre cada servicios  -> si algo se daña se puede seguir usando
//Microservicios -> Salida a Red


//HTTP Module
//npm i --save @nestjs/axios axios

