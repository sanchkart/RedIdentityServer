import Vue from 'vue';
import template from './home.html';
import * as Oidc from 'oidc-client'

export default Vue.extend({
  template,

  data () {
    return {
      msg: '',
      token: ''
    }
  },

  methods: {
    login() {
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
        redirect_uri: 'http://localhost:3000/movies',
        grant_type: 'implicit',
        scope: 'openid profile redcad_api',
        response_type: 'id_token token',
        post_logout_redirect_uri: 'http://localhost:3000/',
        metadata: {
          issuer: 'http://localhost:5000',
          jwks_uri: 'http://localhost:5000/.well-known/openid-configuration/jwks',
          end_session_endpoint: 'http://localhost:5000/connect/endsession',
          authorization_endpoint: 'http://localhost:5000/connect/authorize'
        }
      };
      let mgr = new Oidc.UserManager(config);
      mgr.signinRedirect().then(result => {
        this.msg = result
      })
    },

  }
});
