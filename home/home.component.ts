import { Component, OnInit } from '@angular/core';
import { Endereco } from '../model/cep.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  resultado: string;

  enderecoTxt: string;
  nometitular: string;
  cep: Endereco;
  renda: number;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  pegarCep(cep: string, nome: string, rendaCap: number) {
    
    this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
    .pipe(map(res => res))
    .subscribe(res => {
       this.enderecoTxt = res['logradouro'] + ', ' + res['bairro'] + ', ' + res['localidade'] + ' - ' + res['uf'] + ', ibge ' + res['ibge'];
       this.abrirInfo(nome, this.enderecoTxt, rendaCap);
    });
  }


  getrenda(dinheiro: number, dependentes: number) {
    return dinheiro / dependentes;
  }

  mensagem(nometit: string = "sem nome", cp: string, dinheiro: number, dependentes: number) {

    if (cp == "" || dinheiro == null || dependentes == null) {
      alert("Por favor digite os valores nos campos cep, renda mensal e número de dependentes")
    } else if (cp.length != 8) {
      console.log(cp.length);
      alert("Cep incorreto");
    } else {
      this.renda = this.getrenda(dinheiro, dependentes);
      this.pegarCep(cp, nometit, this.renda);
    }
  }

  abrirInfo(nome: string, endereco: string, renda:number) {
    alert("Senhor " + nome + ", seu endereço é " + endereco + " e sua renda per capita é de: " + renda);
  }

}
