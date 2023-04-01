using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Data;
using ProAtividade.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;

        public AtividadeController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades;
        }

        [HttpGet("{id}")]
        public Atividade Get(int id)
        {
            return _context.Atividades.FirstOrDefault(ati => ati.Id == id);
        }

        [HttpPost]
        public Atividade Post(Atividade activite)
        {
            _context.Atividades.Add(activite);

            if(_context.SaveChanges () > 0)
            {
                return _context.Atividades.FirstOrDefault(act => act.Id == activite.Id);
            }else
            {
                throw new Exception("Erro ao salvar dados.");
            }
        }
        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            if (atividade.Id != id) throw new Exception("Você está tentando atualizar a atividade errada.");

            _context.Update(atividade);

            if(_context.SaveChanges() > 0)
            {
                return _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
            }
            return new Atividade();
        }
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(ati => ati.Id == id);

            if(atividade == null)
            {
                throw new Exception("Você está tentando deletar uma atividade que não existe.");
            }

            _context.Remove(atividade);

            return _context.SaveChanges() > 0;
        }
    }
}
