import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SETTINGS } from "../../app/settings";
import { LoginService } from './login.service';
import { AlertaService } from './alerta.service';
import { Storage } from '@ionic/storage';
/*import { AuthServiceProvider } from '../auth-service/auth-service';
import { AlertaProvider } from '../alerta/alerta';*/

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private loader:  any;
  private headers = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    /*private login: LoginService,*/
    private storage: Storage,
    private alerta: AlertaService
  ) { }

    /**
    * Realiza a criação do Loader
    */
    async criaLoader() {
      this.loader = await this.loadingCtrl.create({
        message: 'Aguarde...',
        keyboardClose: true
      });
      return await this.loader.present();
    }

    /**
    * Realiza a destruição do Loader
    */
    private destroiLoader() {
      if (this.loader) {
        this.loader.dismiss();
        this.loader = null;
      };
    }

    /**
    * Função usada para capturar os erros de conexão
    * @param {string} metodo - Qual o método que foi usado GET, POST, etc...
    * @param {string} url - Qual a URL que foi chamada para gerar o erro.
    * @param {HttpErrorResponse} erro - Qual o erro de retorno do servidor
    */
    private catchError(metodo : string, url : string, erro : HttpErrorResponse) : void {
      this.destroiLoader();
      switch (erro.status) {
        case 401: {
          /*this.login.sendLogoutEvent();*/
          break;
        }
        case 403: {
          // Permissão Negada
          this.alerta.mostrarModal('403');
          break;
        }
        case 404: {
          // Página não encontrada
          this.alerta.mostrarModal('404');
          break;
        }
        default: {
          // Erro interno do servidor
          this.alerta.mostrarModal('generico');
          break;
        }
      }
    }

    /**
    * Retorna a url absoluta da api
    * @param {string} url - A url relativa que será chamada sem a '/' inicial
    */
    private getUrlAbsolutaApi(url){
      return SETTINGS.API_URL + url;
    }

    /**
    * Realiza uma requisicao para a url
    * @param {string} metodo - O método HTTP que será usado
    * @param {string} url - A url relativa que será chamada sem a '/' inicial
    * @param {formData} postData - Um formData com os dados que serão enviados
    * @param {boolean} callLoader - Usado para renderizar o loader se necessário
    */
    private request(metodo : string, url : string, postData : FormData, callLoader : boolean) {
      let fullURL = this.getUrlAbsolutaApi(url);
      if (callLoader) {
        this.destroiLoader();
        this.criaLoader()
      }

      return this.storage.get('token').then(token => {
        let headers = this.headers;
        if (token) {
          headers = this.headers.append('Authorization', 'Token ' + token);
        }

        return new Promise(resolve => {
          this.http.request(
            metodo,
            fullURL,
            { headers: headers, body : postData }
          ).subscribe(
            (data) => {
              resolve(data);
              this.destroiLoader();
            },
            (erro) => this.catchError(metodo, url, erro)
          );
        });
      });
    }

    /**
    * Realiza uma requisicao de get
    * @param {string} url - A url relativa que será chamada sem a '/' inicial
    * @param {boolean} callLoader - Usado para renderizar o loader se necessário
    */
    public get(url : string, callLoader : boolean = true) {
      return this.request('GET', url, new FormData(), callLoader);
    }

    /**
    * Realiza uma requisicao de delete
    * @param {string} url - A url relativa que será chamada sem a '/' inicial
    * @param {boolean} callLoader - Usado para renderizar o loader se necessário
    */
    public delete(url : string, callLoader : boolean = true) {
      return this.request('DELETE', url, new FormData(), callLoader);
    }

    /**
    * Realiza uma requisicao de post
    * @param {string} url - A url relativa que será chamada sem a '/' inicial
    * @param {formData} postData - Um formData com os dados que serão enviados
    * @param {boolean} callLoader - Usado para renderizar o loader se necessário
    */
    public post(url : string, postData : any, callLoader : boolean = true) {
      return this.request('POST', url, postData, callLoader);
    }

    /**
    * Realiza uma requisicao de patch
    * @param {string} url - A url relativa que será chamada sem a '/' inicial
    * @param {formData} postData - Um formData com os dados que serão enviados
    * @param {boolean} callLoader - Usado para renderizar o loader se necessário
    */
    public patch(url : string, postData : any, callLoader : boolean = true) {
      return this.request('PATCH', url, postData, callLoader);
    }

    /**
    * Função usada para testar se o usuário logado possui determinada permissão
    * ou o usuário passado como parâmetro
    * @param {number} objPk - O id do objeto do model BaseConteudo
    * @param {string} perm - A permissão a ser testada: Ex. 'view_arquivo'
    * @param {number} usuarioPk - O id do usuario que será usado. (opcional)
    */
    public hasPerm(objPk : number, perm : string, usuarioPk? : number) {
      let url = 'gandalf/' + objPk + '/' + perm + '/';
      if (usuarioPk) {
        url = url + usuarioPk + '/';
      }
      return this.get(url, false);
    }
}