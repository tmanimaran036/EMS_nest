import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document } from "./typeORM/uploadORM";
import { DocumentsService } from "./documents.service";
import { DocumentsController } from "./documents.controller";
import { Employee } from "src/employees/typeORM/entity";

@Module({
    imports:[TypeOrmModule.forFeature([Document,Employee])],
    controllers:[DocumentsController],
    providers:[DocumentsService],
    exports:[]
})
export class DocumentsModule {}
