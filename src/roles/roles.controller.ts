import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "../interfaces/createRole.dto";
import {RoleEntity} from "../entities/role.entity";
import {AuthGuard} from "../middlewares/auth.middleware";
import {AssignPermissionsDto} from "../interfaces/assignPermissions.dto";
import {Permissions} from "../middlewares/decorators/permissions.decorator";

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        return this.rolesService.create(createRoleDto);
    }

    @UseGuards(AuthGuard)
    @Get('all')
    findAll(): Promise<RoleEntity[]> {
        return this.rolesService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findById(@Param('id') id: number): Promise<RoleEntity> {
        return this.rolesService.findById(id);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        return this.rolesService.update(id, createRoleDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id: number): Promise<{ message: string }> {
        return this.rolesService.delete(id);
    }

    @Post(':id/assign-permissions')
    assignPermissions(@Param('id') id: number, @Body() assignPermissionDto: AssignPermissionsDto ): Promise<RoleEntity> {
        return this.rolesService.assignPermissions(id, assignPermissionDto);
    }

    @Delete(':id/remove-permission/:permissionId')
    removePermission(@Param('id') id: number, @Param('permissionId') permissionId: number): Promise<{message: string}> {
        return this.rolesService.removePermission(id, permissionId);
    }

}
