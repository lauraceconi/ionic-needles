import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertaService } from './alerta.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private alerta: AlertaService
  ) { }

    /**
    * Função usada para capturar os erros de conexão
    * @param {string} metodo - Qual o método que foi usado GET, POST, etc...
    * @param {string} url - Qual a URL que foi chamada para gerar o erro.
    * @param {HttpErrorResponse} erro - Qual o erro de retorno do servidor
    */
    private catchError(metodo : string, url : string, erro : HttpErrorResponse) : void {
      switch (erro.status) {
        case 401: {
          // Não autenticado
          this.alerta.mostrarModal(
            'nao-autenticado',
            'lock',
            'Não autenticado',
            'É necessário se autenticar para acessar esta página',
            true
          );
          break;
        }
        case 403: {
          // Permissão negada
          this.alerta.mostrarModal(
            'permissao-negada',
            'remove-circle-outline',
            'Permissão negada',
            'Você não tem permissão para realizar esta ação.',
            true
          );
          break;
        }
        case 404: {
          // Página não encontrada
          this.alerta.mostrarModal(
            'nao-encontrado',
            'help-circle',
            'Não encontrado',
            'A página que você está tentando acessar não existe.',
            true
          );
          break;        
        }
        default: {
          // Erro interno do servidor
          this.alerta.mostrarModal(
            'erro-generico',
            'sad',
            'Erro',
            'Algo de errado não está certo.',
            false
          );
          break;
        }
      }
    }

    /**
    * Realiza uma requisicao para a url
    * @param {string} metodo - O método HTTP que será usado
    * @param {string} url - A url relativa que será chamada sem a '/' inicial
    * @param {formData} postData - Um formData com os dados que serão enviados
    * @param {boolean} callLoader - Usado para renderizar o loader se necessário
    */
   private async request(metodo : string, url : string, postData : FormData) {
      let loader = await this.loadingCtrl.create({
          message: 'Aguarde...',
          keyboardClose: true
      });
      
      return loader.present().then(() => {
        return this.storage.get('token').then(token => {
          let headers = this.headers;
          if (token) {
            headers = this.headers.append('Authorization', 'Token ' + token);
          }
  
          return new Promise(resolve => {
            this.http.request(
              metodo,
              url,
              { headers: headers, body : postData }
            ).subscribe(
              (data) => {
                resolve(data);
                loader.dismiss();
              },
              (erro) => {
                loader.dismiss();
                this.catchError(metodo, url, erro);
              }
            );
          });
        });
      });   
    }

    /**
    * Realiza uma requisicao de get
    * @param {string} url - A url relativa que será chamada sem a '/' inicial
    * @param {boolean} callLoader - Usado para renderizar o loader se necessário
    */
    public get(url : string, callLoader : boolean = true) {
      return this.request('GET', url, new FormData());
    }

    /**
    * Realiza uma requisicao de delete
    * @param {string} url - A url relativa que será chamada sem a '/' inicial
    * @param {boolean} callLoader - Usado para renderizar o loader se necessário
    */
    public delete(url: string) {
      return this.request('DELETE', url, new FormData());
    }

    /**
    * Realiza uma requisicao de post
    * @param {string} url - A url relativa que será chamada sem a '/' inicial
    * @param {formData} postData - Um formData com os dados que serão enviados
    * @param {boolean} callLoader - Usado para renderizar o loader se necessário
    */
    public post(url: string, postData: any) {
      return this.request('POST', url, postData);
    }

    /**
    * Realiza uma requisicao de patch
    * @param {string} url - A url relativa que será chamada sem a '/' inicial
    * @param {formData} postData - Um formData com os dados que serão enviados
    * @param {boolean} callLoader - Usado para renderizar o loader se necessário
    */
    public patch(url: string, postData: any) {
      return this.request('PATCH', url, postData);
    }

}