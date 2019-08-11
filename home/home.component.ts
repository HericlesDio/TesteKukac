import { Component, OnInit } from '@angular/core';
import { Endereco } from '../model/cep.model';
import { cepService } from './cep.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  resultado:string;

  nometitular: string; 
  cep: Endereco;
  renda:number;

  constructor(private cepService:cepService, private http: HttpClient) { 
  }

  ngOnInit() {
  }

  pegarCep(cep:string){
    console.log(cep);
    return  this.http.get(`viacep.com.br/ws/${cep}/json/ `)
    .subscribe(data => this.cep = this.conversaoCep(data));
  }

  conversaoCep(cepResposta):Endereco{
    console.log(cepResposta);
    let cp : Endereco;
     cp.bairro = cepResposta.bairro;
     cp.cep = cepResposta.cep;
     cp.complemento = cepResposta.complemento;
     cp.gia = cepResposta.gia;
     cp.ibge = cepResposta.ibge;
     cp.localidade = cepResposta.localidade;
     cp.logradouro = cepResposta.logradouro;
     cp.uf = cepResposta.uf;
     cp.unidade = cepResposta.unidade;
    return cp;
  }

  getrenda(dinheiro:number, dependentes:number){
    return dinheiro/dependentes;
  }

  mensagem(nometit:string="sem nome",cp:string,dinheiro:string, dependentes:string ) {
    this.renda = this.getrenda(dinheiro, dependentes);
    this.pegarCep(cp);
    console.log(this.cep);
    //fala que vai dar errado mas funciona
    if(cp == "" || dinheiro == "" || dependentes == "" ){
      alert("Por Favor Digite os valores nos campos Cep, Renda Mensal e Número de dependentes")
    }else if(cp.length < 8 || cp.length >9){
      console.log(cp.length);
      alert("Cep não está do tamanho certo");
    }else {
    alert(" Senhor "+nometit+"\n o senhor mora em"+this.cep.bairro+"\n"+this.cep.cep+"\n"+this.cep.complemento+"\n"+this.cep.gia+
    "\n"+this.cep.ibge+"\n"+this.cep.localidade+"\n"+this.cep.logradouro+
    "\n"+this.cep.uf+"\n"+this.cep.unidade+"\n e sua renda per capta é de:"+this.renda);
  }
}

 

}
