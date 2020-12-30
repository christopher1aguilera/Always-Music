const { Client } = require("pg");
const config = {
user: "chris",
host: "localhost",
database: "clases",
password: "chris1997",
port: 5432,
};
const client = new Client(config);
client.connect();
const accion = process.argv[2]
const nombreEstu = process.argv[3]
const filtro = process.argv[3]
const rutEstu = parseInt(process.argv[4])
const cursoEstu = process.argv[5]
const nivelEstu = parseInt(process.argv[6])
console.log(`${accion}, ${nombreEstu}, ${rutEstu}, ${cursoEstu}, ${nivelEstu}`)

async function ingresar(nombreEstu, rutEstu, cursoEstu, nivelEstu) {
    console.log(`${nombreEstu}, ${rutEstu}, ${cursoEstu}, ${nivelEstu}`)
    const res = await client.query(
    `insert into estudiantes (nombre, rut, curso, nivel) values ('${nombreEstu}', '${rutEstu}', '${cursoEstu}', '${nivelEstu}') RETURNING *`
    );
    console.log(`Estudiante ${nombreEstu} agregado con exito`);
    // console.log("Registro agregado", res.rows[0]);
}

async function editar(nombreEstu, rutEstu, cursoEstu, nivelEstu) {
    const res1 = await client.query(
    `UPDATE estudiantes SET nombre = '${nombreEstu}' WHERE rut = '${rutEstu}' RETURNING*;`
    // `UPDATE estudiantes SET nombre = '${cursoEstu}' WHERE rut = '${rutEstu}' RETURNING*;`
    // `UPDATE estudiantes SET nombre = '${nivelEstu}' WHERE rut = '${rutEstu}' RETURNING*;`
    );
    const res2 = await client.query(
    // `UPDATE estudiantes SET nombre = '${nombreEstu}' WHERE rut = '${rutEstu}' RETURNING*;`
    `UPDATE estudiantes SET nombre = '${cursoEstu}' WHERE rut = '${rutEstu}' RETURNING*;`
    // `UPDATE estudiantes SET nombre = '${nivelEstu}' WHERE rut = '${rutEstu}' RETURNING*;`
    );
    const res3 = await client.query(
    // `UPDATE estudiantes SET nombre = '${nombreEstu}' WHERE rut = '${rutEstu}' RETURNING*;`
    // `UPDATE estudiantes SET nombre = '${cursoEstu}' WHERE rut = '${rutEstu}' RETURNING*;`
    `UPDATE estudiantes SET nombre = '${nivelEstu}' WHERE rut = '${rutEstu}' RETURNING*;`
    );
    console.log(`estudiante ${nombreEstu} editado con exito`);
    client.end();
}

async function consultar() {
    const res = await client.query("select * from estudiantes");
    console.log("Registro: ", res.rows);
}

async function consultarRut(rut) {
    const res = await client.query(
    `select * from estudiantes where rut = '${rut}'`
    );
    console.log(`Registro con el rut: ${rut}`, res.rows[0]);
    }

async function eliminar(rut) {
    const res = await client.query(
    `DELETE FROM estudiantes where rut = '${rut}'`
    );
    console.log(`registro de estudiante con rut ${rut} eliminado`);
    // client.end();
}
        
if (accion == 'nuevo'){
    ingresar(nombreEstu, rutEstu, cursoEstu, nivelEstu)
    // .then(() => consulta())
    .then( () => client.end());
}

if (accion == 'consulta'){
    consultar()
    // .then(() => consulta())
    .then( () => client.end());
}

if (accion == 'editar'){
    editar(nombreEstu, rutEstu, cursoEstu, nivelEstu)
    // .then(() => consulta())
    .then( () => client.end());
}

if (accion == 'rut'){
    consultarRut(filtro)
    // .then(() => consulta())
    .then( () => client.end());
}

if (accion == 'eliminar'){
    eliminar(filtro)
    // .then(() => consulta())
    .then( () => client.end());
}
    // ingresar()
    // .then(() => consulta())
    // .then(() => editar())
    // // // .then(() => eliminar())
    // .then( () => client.end());


