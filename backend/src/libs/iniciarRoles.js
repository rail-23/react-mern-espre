import Role from '../models/Role.js';

export const crearRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;

        await Promise.all([
            new Role({ name: 'estudiante' }).save(),
            new Role({ name: 'decano' }).save(),
            new Role({ name: 'vicerrector' }).save()
        ]);

        console.log("Roles inicializados correctamente");
    } catch (error) {
        console.error(error);
    }
};
