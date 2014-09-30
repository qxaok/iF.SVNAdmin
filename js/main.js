(function (jQ) {
  "use strict";
  var _loadingView = null;
  
  /**
    Main class to manage the GUI and all of it's requirements.
  **/
  function AppEngine() {
    this.config = {};
  }

  AppEngine.prototype.init = function () {
    brite.viewDefaultConfig.loadTmpl = true;
    brite.viewDefaultConfig.loadCss = true;
    brite.viewDefaultConfig.loadJs = true;
  };

  AppEngine.prototype.bootstrap = function () {
    svnadmin.service.ajax({
      url: "service/",
      data: { m: "LoginService", action: "check" }
    }).done(function (data) {
      svnadmin.app.showMainView();
    }).fail(function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 401) {
        brite.display("LoginView", ".AppContent");
      } else {
        alert("Network error!");
      }
    });
  };

  AppEngine.prototype.logout = function () {
    svnadmin.service.logout().always(function () {
      window.location.reload();
    });
  };
  
  AppEngine.prototype.showLoading = function () {
    return brite.display("LoadingView", "body").done(function (view) {
      _loadingView = view;
    });
  };
  
  AppEngine.prototype.hideLoading = function () {
    if (_loadingView) {
      _loadingView.$el.bRemove();
      _loadingView = null;
    }
  };

  AppEngine.prototype.showMainView = function () {
    return brite.display("MainView", ".AppContent", {}, { emptyParent: true });
  };

  AppEngine.prototype.showUserListView = function (providerId) {
    return brite.display("UserListView", "#page-wrapper", { providerId: providerId }, { emptyParent: true });
  };

  AppEngine.prototype.showUserInfoView = function (providerId, userId) {
    return brite.display("UserInfoView", "#page-wrapper", { providerId: providerId, userId: userId }, { emptyParent: true });
  };
  
  AppEngine.prototype.showGroupListView = function (providerId) {
    return brite.display("GroupListView", "#page-wrapper", { providerId: providerId }, { emptyParent: true });
  };
  
  AppEngine.prototype.showGroupInfoView = function (providerId, groupId) {
    return brite.display("GroupInfoView", "#page-wrapper", { providerId: providerId, groupId: groupId }, { emptyParent: true });
  };
  
  AppEngine.prototype.showRepositoryListView = function (providerId) {
    return brite.display("RepositoryListView", "#page-wrapper", { providerId: providerId }, { emptyParent: true });
  };
  
  AppEngine.prototype.showRepositoryInfoView = function (providerId, repositoryId) {
    return brite.display("RepositoryInfoView", "#page-wrapper", { providerId: providerId, repositoryId: repositoryId }, { emptyParent: true });
  };

  window.svnadmin = window.svnadmin || {};
  window.svnadmin.app = window.svnadmin.app || new AppEngine();
}(jQuery));


(function (jQ) {
  "use strict";
  /**
    Remote web service client class.
    Provides access to all REST services.
  **/
  function ServiceClient() {
  }

  ServiceClient.prototype.ajax = function (settings) {
    return jQ.ajax(settings);
  };

  // Authentication

  ServiceClient.prototype.login = function (username, password) {
    return this.ajax({
      url: "service/",
      data: {
        m: "LoginService",
        action: "login",
        username: username,
        password: password
      }
    });
  };

  ServiceClient.prototype.logout = function () {
    return this.ajax({
      url: "service/",
      data: {
        m: "LoginService",
        action: "logout"
      }
    });
  };

  // Common

  ServiceClient.prototype.getSystemInfo = function () {
    return this.ajax({
      url: "service/",
      data: {
        m: "CommonService",
        action: "systeminfo"
      }
    });
  };

  ServiceClient.prototype.getFileSystemInfo = function () {
    return this.ajax({
      url: "service/",
      data: {
        m: "CommonService",
        action: "filesysteminfo"
      }
    });
  };

  // Users

  ServiceClient.prototype.getUserProviders = function () {
    return this.ajax({
      url: "service/",
      data: {
        m: "UserService",
        action: "providers"
      }
    });
  };

  ServiceClient.prototype.getUsers = function (providerId, offset, num) {
    return this.ajax({
      url: "service/",
      data: {
        m: "UserService",
        action: "list",
        providerid: providerId,
        offset: offset,
        num: num
      }
    });
  };

  ServiceClient.prototype.createUser = function (providerId, name, password) {
    return this.ajax({
      url: "service/",
      data: {
        m: "UserService",
        action: "create",
        providerid: providerId,
        name: name,
        password: password
      }
    });
  };

  ServiceClient.prototype.deleteUser = function (providerId, userId) {
    return this.ajax({
      url: "service/",
      data: {
        m: "UserService",
        action: "delete",
        providerid: providerId,
        userid: userId
      }
    });
  };

  ServiceClient.prototype.getGroupsOfUser = function (providerId, userId) {
    return this.ajax({
      url: "service/",
      data: {
        m: "UserService",
        action: "groups",
        providerid: providerId,
        userid: userId
      }
    });
  };
  
  // Groups
  
  ServiceClient.prototype.getGroupProviders = function () {
    return this.ajax({
      url: "service/",
      data: {
        m: "GroupService",
        action: "providers"
      }
    });
  };
  
  ServiceClient.prototype.getGroups = function (providerId, offset, num) {
    return this.ajax({
      url: "service/",
      data: {
        m: "GroupService",
        action: "list",
        providerid: providerId,
        offset: offset,
        num: num
      }
    });
  };
  
  ServiceClient.prototype.createGroup = function (providerId, name) {
    return this.ajax({
      url: "service/",
      data: {
        m: "GroupService",
        action: "create",
        providerid: providerId,
        name: name
      }
    });
  };
  
  ServiceClient.prototype.deleteGroup = function (providerId, groupId) {
    return this.ajax({
      url: "service/",
      data: {
        m: "GroupService",
        action: "delete",
        providerid: providerId,
        groupid: groupId
      }
    });
  };
  
  // Repositories
  
  ServiceClient.prototype.getRepositoryProviders = function () {
    return this.ajax({
      url: "service/",
      data: {
        m: "RepositoryService",
        action: "providers"
      }
    });
  };
  
  ServiceClient.prototype.getRepositories = function (providerId, offset, num) {
    return this.ajax({
      url: "service/",
      data: {
        m: "RepositoryService",
        action: "list",
        providerid: providerId,
        offset: offset,
        num: num
      }
    });
  };
  
  ServiceClient.prototype.createRepository = function (providerId, name) {
    return this.ajax({
      url: "service/",
      data: {
        m: "RepositoryService",
        action: "create",
        providerid: providerId,
        name: name
      }
    });
  };
  
  ServiceClient.prototype.deleteRepository = function (providerId, repositoryId) {
    return this.ajax({
      url: "service/",
      data: {
        m: "RepositoryService",
        action: "delete",
        providerid: providerId,
        repositoryid: repositoryId
      }
    });
  };

  window.svnadmin = window.svnadmin || {};
  window.svnadmin.service = window.svnadmin.service || new ServiceClient();
}(jQuery));

/**
 * Global Helper Functions
 */
function tr(str) {
  "use strict";
  return str;
}


/**
 * Template Helper Functions
 */
$.views.helpers({
  tr: function (str) {
    "use strict";
    return str;
  },
  formatSize: function (bytes) {
    "use strict";
    var kb = bytes / 1024,
      mb = kb / 1024,
      gb = mb / 1024,
      tb = gb / 1024;
    return Math.round(gb * 100) / 100 + " GB";
  }
});


/**
  Main entry point for scripts.
**/
jQuery(document).ready(function () {
  "use strict";
  jQuery.noConflict();
  svnadmin.app.init();
  svnadmin.app.bootstrap();
});