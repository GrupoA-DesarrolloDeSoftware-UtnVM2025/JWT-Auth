import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {PermissionsService} from "./permissions.service";
import {CreatePermissionDto} from "../interfaces/createPermission.dto";
import {PermissionEntity} from "../entities/permission.entity";
import {AuthGuard} from "../middlewares/auth.middleware";

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createPermissionDto: CreatePermissionDto): Promise<PermissionEntity> {
        return this.permissionsService.create(createPermissionDto);
    }

    @UseGuards(AuthGuard)
    @Get('all')
    findAll(): Promise<PermissionEntity[]> {
        return this.permissionsService.findAll();
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() createPermissionDto: CreatePermissionDto): Promise<PermissionEntity> {
        return this.permissionsService.update(id, createPermissionDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id: number): Promise<{ message: string }> {
        return this.permissionsService.delete(id);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findById(@Param('id') id: number): Promise<PermissionEntity> {
        return this.permissionsService.findById(id);
    }

}
