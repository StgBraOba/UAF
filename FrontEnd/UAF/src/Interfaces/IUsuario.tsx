export interface IUsuario {
    id_Usuario? : number,
    username : string,
    email : string,
    id_Rol : number,
    estado : string,
    PasswordHash : string;
}