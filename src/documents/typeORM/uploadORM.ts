import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'documents'})
export class Document{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    employee_id:number;

    @Column()
    filename:string;

    @Column()
    filepath:string;

    @Column({type:'timestamp',default: () => "CURRENT_TIMESTAMP"})
    upload_at:Date;
        
}