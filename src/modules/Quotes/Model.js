import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../database/sequelize.js";

export class Quotes extends Model { }

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
Quotes.init(
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Nombre del cliente",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true, // Validación para asegurar que el formato del email es correcto
            },
            comment: "Correo electrónico del cliente",
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: "Número de teléfono del cliente",
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "Mensaje o descripción de la cotización",
        },
        status: {
            type: DataTypes.ENUM("pending", "approved", "rejected"),
            allowNull: false,
            defaultValue: "pending",
            comment: "Estado de la cotización (pendiente, aprobada, rechazada)",
        },
        // add your columns here ✍️ 

    },
    {
        sequelize,
        modelName: "quotes",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);
