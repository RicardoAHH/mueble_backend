import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../database/sequelize.js";

export class Roles extends Model { }

/**
     * Configuración del campo id: 🚀
     *   - **type**: 'DataTypes.BIGINT' 🛠️
     *   - **BIGINT**: Utilizado para almacenar números enteros grandes. 📊 
     *   - Nota: Usa el mismo tipo de dato para llaves foráneas (ej: 'id BIGINT UNSIGNED'). 🔑
     *   - **autoIncrement**: true 🔄
     *   - Incrementa automáticamente el valor cada vez que se inserta un nuevo registro. 📈
     *   - **primaryKey**: true 🏷️
     *   - Define este campo como la clave primaria de la tabla. 🗂️
*/
Roles.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        }

        // add your columns here ✍️ 

    },
    {
        sequelize,
        modelName: "roles",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
