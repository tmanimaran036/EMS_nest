import { Column, Entity,PrimaryGeneratedColumn }  from 'typeorm';
@Entity({ name:'employees' })// table name

export class Employee{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;

    @Column({unique:true})
    email:string;

    @Column()
    position:string;

    @Column({type:'decimal',precision:10,scale:2})
    salary: number;

    @Column({nullable:true})
    manager_id:number;

    @Column({type:'timestamp',default:()=> 'CURRENT_TIMESTAMP'})
    created_at:Date;

    @Column({default:false})
    is_deleted:boolean;

    @Column({type:'timestamp',nullable:true,default:null})
    delete_at: Date;
}
