using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        [HttpGet]
        public Atividade get()
        {
            return new Atividade();
        }
        [HttpGet("{id}")]
        public string get(int id)
        {
            return $"Minha controler {id}";
        }
        [HttpPost]
        public Atividade post(Atividade atividade)
        {
            return atividade;
        }
        [HttpPut]
        public string put()
        {
            return "Minha controler";
        }
        [HttpDelete]
        public string delete()
        {
            return "Minha controler";
        }
    }
}
