import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import * as encrypt from 'bcrypt'
@Entity({ name:"users" })
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    
    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column()
    role:string;

    @Column({type:'timestamp',default:()=> 'CURRENT_TIMESTAMP'} )
    create_at:Date;

    @BeforeInsert()
     async hassPassword(){
       const salt =await encrypt.genSalt(10);
       this.password=await encrypt.hash(this.password,salt)
     }
}