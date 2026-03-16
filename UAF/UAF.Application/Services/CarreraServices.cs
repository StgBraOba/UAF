using UAF.Application.DTos;
using UAF.Application.Interfaces;
using UAF.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace UAF.Application.Services
{
    public class CarreraServices
    {
        private readonly IEnumerableCarrera _repository;

        public CarreraServices(IEnumerableCarrera repository)
        {
            _repository = repository; 
        }

        public async Task<IEnumerable<CarreraDTos>> ListaCarrera()
        {
            var lista = await _repository.ListarCarreraAsync();
            return lista.Select(x => new CarreraDTos
            {
                Cod_Carrera = x.Cod_Carrera,
                NombreCarrera = x.NombreCarrera,
                Estado = x.Estado,
                Cod_Facultad = x.Cod_Facultad
            });

        }

        public async Task<IEnumerable<CarreraDTos>> ListaCarreraPorNombre(string Buscar)
        {
            if (string.IsNullOrWhiteSpace(Buscar))
                return Enumerable.Empty<CarreraDTos>();


            var lista = await _repository.ListarCarreraPorNombreAsync(Buscar);
            return lista.Select(x => new CarreraDTos
            {
                Cod_Carrera = x.Cod_Carrera,
                NombreCarrera = x.NombreCarrera,
                Estado = x.Estado,
                Cod_Facultad = x.Cod_Facultad
            });

        }

        //Metodo Insertar

        public async Task NuevaCarrera(CarreraDTos dto)
        {
            var ocarrera = new Carrera
            {
                NombreCarrera = dto.NombreCarrera,
                Estado = dto.Estado,
                Cod_Facultad = dto.Cod_Facultad
            };

            await _repository.NuevaCarreraAsync(ocarrera);
        }

        //Metodo Editar
        public async Task EditarCarrera(CarreraDTos dto)
        {
            var ocarrera = new Carrera
            {
                Cod_Carrera = dto.Cod_Carrera,
                NombreCarrera = dto.NombreCarrera,
                Estado = dto.Estado,
                Cod_Facultad = dto.Cod_Facultad
            };

            await _repository.EditarCarreraAsync (ocarrera);
        }

        //Metodo Eliminar
        public async Task EliminarCarrera(int id)
        {
            await _repository.EliminarCarreraAsync(id);
        }
    }
}
