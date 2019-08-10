import { Component, OnInit } from '@angular/core';
import { endereco } from '../model/cep.model';
import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  resultado:string;

  nometitular: string; 
  endereco: endereco;
  renda:number;
  constructor() { 
  }

  ngOnInit() {
  }

  transformarCep(cep:number){
   
    }

  mensagem(nometit:string="sem nome",cep:string,dinheiro:number, dependentes:number ) {
    this.renda = dinheiro / dependentes;
    //fala que vai dar errado mas funciona
    if(cep == "" || dinheiro== "" || dependentes=="" ){
      alert("Por Favor Digite os valores nos campos Cep, Renda Mensal e Número de dependentes")
    }else if(cep.length < 8 || cep.length >9){
      console.log(cep.length);
      alert("Cep não está do tamanho certo");
    }else {
    alert(" Senhor "+nometit+"\n o senhor mora em"+`viacep.com.br/ws/${cep}/json/ `+"\n e sua renda per capta é de:"+this.renda);
  }
}

 

}
