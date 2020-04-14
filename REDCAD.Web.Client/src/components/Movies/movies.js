import Vue from 'vue';

import * as Oidc from 'oidc-client'
import axios from 'axios';
import { MOVIES_ENDPOINT } from 'src/config/constants';
import template from './movies.html';
const animation = 'flipInX';
const animationDelay = 25; // in ms

export default Vue.extend({
  template,

  data() {
    return {
      movies: []
    };
  },
  created(){
    let accessToken = this.getParameterByName('access_token');
    this.getMovies(accessToken);
  },

  methods: {
    getParameterByName(name) {
      let match = new RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },
    getMovies (accessToken) {
      let client = axios.create({
        baseURL: MOVIES_ENDPOINT,
        headers: {
          "Authorization": "Bearer " + accessToken,
        },
      });
      return client.get('/')
        .then((response) => {
          this.movies = response.data;
        })
        .catch((errorResponse) => {
          // Handle error...
          console.log('API responded with:', errorResponse);
        });
    },

    logout() {
      let config = {
        // следить за состоянием сессии на IdentityServer, по умолчанию true
        monitorSession: true,
        // интервал в миллисекундах, раз в который нужно проверять сессию пользователя, по умолчанию 2000
        checkSessionInterval: 30000,
        // отзывает access_token в соответствии со стандартом https://tools.ietf.org/html/rfc7009
        revokeAccessTokenOnSignout: true,
        // допустимая погрешность часов на клиенте и серверах, нужна для валидации токенов, по умолчанию 300
        // https://github.com/IdentityModel/oidc-client-js/blob/1.3.0/src/JoseUtil.js#L95
        clockSkew: 300,
        // делать ли запрос к UserInfo endpoint для того, чтоб добавить данные в профиль пользователя
        loadUserInfo: true,

        authority: 'http://localhost:5000',
        client_id: 'js',
        // client_secret: 'secret',
        redirect_uri: 'http://localhost:8080/movies',
        grant_type: 'implicit',
        scope: 'redcad_api',
        response_type: 'id_token token',
        post_logout_redirect_uri: 'http://localhost:8080/',
        metadata: {
          issuer: 'http://localhost:5000',
          jwks_uri: 'http://localhost:5000/.well-known/openid-configuration/jwks',
          end_session_endpoint: 'http://localhost:5000/connect/endsession',
          authorization_endpoint: 'http://localhost:5000/connect/authorize'
        }
      };
      let mgr = new Oidc.UserManager(config);
      mgr.signoutRedirect()
    },
    // Methods for transitions
    handleBeforeEnter(el) {
      el.style.opacity = 0;
      el.classList.add('animated');
    },

    handleEnter(el) {
      const delay = el.dataset.index * animationDelay;
      setTimeout(() => {
        el.style.opacity = 1;
        el.classList.add(animation);
      }, delay);
    }
  }
});
