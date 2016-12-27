this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/addSource.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\n\t<input ng-model="ctr.sourceName" placeholder="name">\n\t<input ng-model="ctr.sourceUrl" placeholder="url">\n\t<button ng-click="ctr.addSource()">Add</button>\n</div>';

}
return __p
};

this["JST"]["assets/templates/index.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h1>Hi there</h1>';

}
return __p
};

this["JST"]["assets/templates/login.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="myContainer container">\n  <div class="row">\n\n    <header class="panel-heading">\n      <h1 class="title">Welcome back. Login to access</h1>\n    </header>\n\n    <form class="loginForm" method="post" action="#">\n\n      <div class="form-group">\n        <label for="email" class="cols-sm-2 control-label">Your Email</label>\n        <div class="cols-sm-10">\n          <div class="input-group">\n            <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>\n            <input type="text" ng-model="ctr.email" class="form-control" name="email" id="email"  placeholder="Email" tabindex="1"/>\n          </div>\n        </div>\n      </div>\n\n      <div class="form-group">\n        <label for="password" class="cols-sm-2 control-label">Password</label>\n        <div class="cols-sm-10">\n          <div class="input-group">\n            <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>\n            <input type="password" ng-model="ctr.password" class="form-control" name="password" id="password"  placeholder="Password" tabindex="2"/>\n          </div>\n        </div>\n      </div>\n\n      <button type="button" ng-click="login()" class="btnLogin btn btn-lg btn-block" tabindex="3">Login</button>\n\n      <footer class="footerCase">\n        <span>Don\'t have an account? </span>\n        <a class="link-login" ui-sref="app.register">Get started</a>\n      </footer>\n\n    </form>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["assets/templates/news.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\n  <button ng-click="ctr.refreshNews()">Refresh</button>\n</div>\n<div class="newsChannel" ng-repeat="article in ctr.articles">\n\n    <div class="itemContent col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2">\n      <h2 class="itemTitle">\n        <a rel="external" class="itemLink" href="{{article.link}}" target="_blank">{{article.title}}</a>\n      </h2>\n\n      <ul class="info">\n        <li class="date">{{article.publication_date}}</li>\n        <li class="hourCreate">{{article.createdAt}}</li>\n        <li class="hourUpdate">{{article.updatedAt}}</li>\n      </ul>\n\n      <span class="itemDescription">{{article.description}}</span>\n\n      <!--Tags in item of news-->\n      <div class="tagSet" ng-repeat="tag in article.tags">\n\n        <!--Single tag-->\n        <div class="tag">\n          <div class="tagContent">\n            <p class="tagName">{{tag.name}}</p>\n            <sup><i class="fa fa-times" aria-hidden="true"></i> </sup>\n          </div>\n        </div> <!-- End tag-->\n      </div> <!--  End tagSet-->\n\n      <input class="tag newTag" type="text" ng-maxlength="60" name="tag" ng-model="ctr.addTagForms[$index].name">\n      <input id="addBtn" name="add" value="+" type="submit" ng-click="ctr.addTag(article, ctr.addTagForms[$index].name)">\n\n    </div> <!-- End itemContent-->\n</div> <!-- End newsChannel-->';

}
return __p
};

this["JST"]["assets/templates/register.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="myContainer container">\n  <div class="row">\n\n    <header class="panel-heading">\n      <h1 class="title">Create an account</h1>\n    </header>\n\n    <form class="registerForm" method="post" action="#">\n\n      <div class="form-group">\n        <label for="email" class="cols-sm-2 control-label">Your Email</label>\n        <div class="cols-sm-10">\n          <div class="input-group">\n            <span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>\n            <input type="text" ng-model="ctr.email" class="form-control" name="email" id="email"  placeholder="Email" tabindex="1"/>\n          </div>\n        </div>\n      </div>\n\n      <div class="form-group">\n        <label for="name" class="cols-sm-2 control-label">First name</label>\n        <div class="cols-sm-10">\n          <div class="input-group">\n            <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>\n            <input type="text" ng-model="ctr.firstName" class="form-control" name="name" id="name"  placeholder="Name" required="" tabindex="2"/>\n          </div>\n        </div>\n      </div>\n\n      <div class="form-group">\n        <label for="username" class="cols-sm-2 control-label">Last name</label>\n        <div class="cols-sm-10">\n          <div class="input-group">\n            <span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>\n            <input type="text" ng-model="ctr.lastName" class="form-control" name="username" id="username"  placeholder="Username" required="" tabindex="3"/>\n          </div>\n        </div>\n      </div>\n\n      <div class="form-group">\n        <label for="password" class="cols-sm-2 control-label">Password</label>\n        <div class="cols-sm-10">\n          <div class="input-group">\n            <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>\n            <input type="password" ng-model="ctr.password" class="form-control" name="password" id="password"  minlength="6" placeholder="Password" maxlength="100" required="" tabindex="4"/>\n          </div>\n        </div>\n      </div>\n\n      <div class="form-group">\n        <label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>\n        <div class="cols-sm-10">\n          <div class="input-group">\n            <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>\n            <input type="password" ng-model="ctr.confirmPassword" class="form-control" name="confirm" id="confirm"  placeholder="Confirm Password" required="" tabindex="4"/>\n          </div>\n        </div>\n      </div>\n\n      <button type="button" ng-click="ctr.register()" class="btnSignUp btn btn-lg btn-block" tabindex="5">Sign Up</button>\n\n      <footer class="footerCase">\n        <span>Already have an account? </span>\n        <a class="link-login" ui-sref="app.login">Login here</a>\n      </footer>\n\n    </form>\n  </div>\n</div>\n';

}
return __p
};

this["JST"]["assets/templates/sources.tpl.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div>\n\t<div ng-repeat="source in ctr.sources">\n\t\t<h3>{{source.name}}</h3>\n\t\t<h4>{{source.url}}</h4>\n\t\t<button ng-click="!source.mySubscr && ctr.subscribe(source)" ng-disabled="source.mySubscr">Subscribe</button>\n\t</div>\n</div>';

}
return __p
};