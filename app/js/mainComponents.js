(function() {
  var Accounts, AccountsAction, AccountsDisplay, Configuration, ConversationDisplay, ConversationSearch, Conversations, MainWindow, a, br, button, dd, div, dl, dt, fieldset, h3, img, input, label, li, ol, span, ul, _ref, _ref1, _ref2, _ref3,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = React.DOM, div = _ref.div, span = _ref.span, button = _ref.button, img = _ref.img, h3 = _ref.h3, input = _ref.input, label = _ref.label, br = _ref.br;

  AccountsDisplay = React.createClass({
    getInitialState: function() {
      return {
        selected: false
      };
    },
    selectedChange: function() {
      return this.props.changeSelectedAccount(this.props.account, $(this.refs.selected.getDOMNode()).prop("checked") === true);
    },
    componentDidMount: function() {
      var $myInput, $panel, panel, selected, _ref1;
      _ref1 = this.refs, panel = _ref1.panel, selected = _ref1.selected;
      $myInput = $(selected.getDOMNode());
      $panel = $(panel.getDOMNode());
      $myInput.change((function(_this) {
        return function(e) {
          _this.setState({
            selected: $myInput.prop("checked")
          });
          return _this.selectedChange();
        };
      })(this));
      return $panel.click((function(_this) {
        return function(e) {
          var $previous;
          $previous = $("input[name='selectedAccount']:checked");
          $myInput.prop("checked", !$myInput.prop("checked"));
          if ($previous[0] !== $myInput[0]) {
            $previous.trigger("change");
          }
          return $myInput.trigger("change");
        };
      })(this));
    },
    render: function() {
      var panel_class;
      panel_class = 'panel';
      if (this.state.selected === true) {
        panel_class = 'panel callout';
      }
      return div({
        className: 'small-12 columns'
      }, input({
        type: 'radio',
        name: 'selectedAccount',
        className: 'hide',
        ref: 'selected'
      }), div({
        className: panel_class,
        ref: 'panel'
      }, div({
        className: 'row'
      }, div({
        className: 'small-2 columns'
      }, img({
        src: 'http://placehold.it/64x64',
        alt: 'your profile picture'
      })), div({
        className: 'small-8 columns'
      }, div({
        className: 'row'
      }, div({
        className: 'small-12 columns'
      }, h3({}, this.props.account.alias))), div({
        className: 'row'
      }, div({
        className: 'small-12 columns'
      }, span({}, this.props.account.protocol.join(" / "))))), div({
        className: 'small-2 columns'
      }, br({}), div({
        className: 'switch large right round'
      }, input({
        id: "account-" + this.props.key + "-active",
        type: 'checkbox'
      }), label({
        htmlFor: "account-" + this.props.key + "-active"
      }))))));
    }
  });

  AccountsAction = React.createClass({
    doAction: function(e) {
      return e.preventDefault();
    },
    render: function() {
      return button({
        className: 'button action primary text-centered',
        onClick: this.props.action
      }, span({
        className: "fa fa-" + this.props.button.icon
      }), " " + this.props.button.text);
    }
  });

  Accounts = React.createClass({
    getInitialState: function() {
      var account_names, account_types, accounts, i, name, name_idx, type, type_idx, _i;
      account_types = [["jabber", "Google Hangouts", "@gmail.com"], ["jabber", "Hipchat", ""], ["irc", "Internet Relay Chat", ""]];
      account_names = ["DeepRoy_xXx", "master_cheif_94", "sohawtritenow", "sorrowman", "thATGuy", "Alex", "James"];
      accounts = [];
      for (i = _i = 0; _i <= 10; i = ++_i) {
        type_idx = Math.floor(Math.random() * account_types.length);
        type = account_types[type_idx];
        name_idx = Math.floor(Math.random() * account_names.length);
        name = account_names[name_idx];
        accounts.push({
          alias: name,
          name: name + type[2],
          protocol: [type[0], type[1]]
        });
      }
      return {
        accounts: accounts,
        selectedAccount: null
      };
    },
    showPage: function(url) {
      return console.log("Open page", url);
    },
    changeSelectedAccount: function(account, isSelected) {
      var acc;
      acc = account;
      if (isSelected !== true) {
        acc = null;
      }
      console.log("Accounts::changeSelectedAccount", acc);
      return this.setState({
        selectedAccount: acc
      });
    },
    render: function() {
      return div({
        className: 'row with_button main_list'
      }, this.state.accounts.map((function(_this) {
        return function(account, index) {
          return AccountsDisplay({
            key: index,
            account: account,
            changeSelectedAccount: _this.changeSelectedAccount
          });
        };
      })(this)), this.state.selectedAccount != null ? AccountsAction({
        button: {
          icon: 'edit',
          text: 'Modify Account'
        },
        action: (function(_this) {
          return function(e) {
            e.preventDefault();
            return _this.showPage("views/wizard.html?account=x");
          };
        })(this)
      }) : AccountsAction({
        button: {
          icon: 'plus',
          text: 'Add Account'
        },
        action: (function(_this) {
          return function(e) {
            e.preventDefault();
            return _this.showPage("views/wizard.html");
          };
        })(this)
      }));
    }
  });

  window.HummingbeardAccounts = Accounts;

  _ref1 = React.DOM, ul = _ref1.ul, ol = _ref1.ol, li = _ref1.li, dl = _ref1.dl, dt = _ref1.dt, dd = _ref1.dd;

  Configuration = React.createClass({
    render: function() {
      return ul({});
    }
  });

  window.HummingbeardConfiguration = Configuration;

  _ref2 = React.DOM, div = _ref2.div, span = _ref2.span, button = _ref2.button, img = _ref2.img, h3 = _ref2.h3, input = _ref2.input, label = _ref2.label, br = _ref2.br, fieldset = _ref2.fieldset;

  ConversationSearch = React.createClass({
    showOptionFields: function() {
      return $(this.refs.optionFields.getDOMNode()).removeClass("hide").addClass("show");
    },
    hideOptionFields: function() {
      return $(this.refs.optionFields.getDOMNode()).removeClass("show").addClass("hide");
    },
    componentDidMount: function() {
      $("*", this.refs.panel.getDOMNode()).blur(this.hideOptionFields);
      return $("*", this.refs.panel.getDOMNode()).focus(this.showOptionFields);
    },
    render: function() {
      return div({
        className: 'small-12 columns'
      }, div({
        className: 'panel',
        ref: 'panel'
      }, label({}, input({
        className: 'radius',
        type: 'text',
        placeholder: 'Search Conversations',
        ref: 'input'
      })), div({
        ref: 'optionFields',
        className: 'hide'
      }, input({
        id: 'show_online_only',
        type: 'checkbox'
      }), label({
        htmlFor: 'show_online_only'
      }, "Show online accounts only"), br({}), input({
        id: 'hide_archived',
        type: 'checkbox'
      }), label({
        htmlFor: 'hide_archived'
      }, "Hide archived conversations"))));
    }
  });

  ConversationDisplay = React.createClass({
    getInitialState: function() {
      return {
        selected: false
      };
    },
    selectedChange: function() {
      return this.props.changeSelectedAccount(this.props.account, $(this.refs.selected.getDOMNode()).prop("checked") === true);
    },
    componentDidMount: function() {
      var $myInput, $panel, panel, selected, _ref3;
      _ref3 = this.refs, panel = _ref3.panel, selected = _ref3.selected;
      $myInput = $(selected.getDOMNode());
      $panel = $(panel.getDOMNode());
      $myInput.change((function(_this) {
        return function(e) {
          _this.setState({
            selected: $myInput.prop("checked")
          });
          return _this.selectedChange();
        };
      })(this));
      return $panel.click((function(_this) {
        return function(e) {
          var $previous;
          $previous = $("input[name='selectedAccount']:checked");
          $myInput.prop("checked", !$myInput.prop("checked"));
          if ($previous[0] !== $myInput[0]) {
            $previous.trigger("change");
          }
          return $myInput.trigger("change");
        };
      })(this));
    },
    render: function() {
      var panel_class;
      panel_class = 'panel';
      if (this.state.selected === true) {
        panel_class = 'panel callout';
      }
      return div({
        className: 'small-12 columns'
      }, input({
        type: 'radio',
        name: 'selectedAccount',
        className: 'hide',
        ref: 'selected'
      }), div({
        className: panel_class,
        ref: 'panel'
      }, div({
        className: 'row'
      }, div({
        className: 'small-2 columns'
      }, img({
        src: 'http://placehold.it/64x64',
        alt: 'your profile picture'
      })), div({
        className: 'small-8 columns'
      }, div({
        className: 'row'
      }, div({
        className: 'small-12 columns'
      }, h3({}, this.props.account.alias))), div({
        className: 'row'
      }, div({
        className: 'small-12 columns'
      }, span({}, this.props.account.protocol.join(" / "))))), div({
        className: 'small-2 columns'
      }, br({}), div({
        className: 'switch large right round'
      }, input({
        id: "account-" + this.props.key + "-active",
        type: 'checkbox'
      }), label({
        htmlFor: "account-" + this.props.key + "-active"
      }))))));
    }
  });

  AccountsAction = React.createClass({
    render: function() {
      return button({
        className: 'button action primary text-centered',
        onClick: this.props.action
      }, span({
        className: "fa fa-" + this.props.button.icon
      }), " " + this.props.button.text);
    }
  });

  Conversations = React.createClass({
    getInitialState: function() {
      var account_names, account_types, accounts, i, name, name_idx, type, type_idx, _i;
      account_types = [["jabber", "Google Hangouts", "@gmail.com"], ["jabber", "Hipchat", ""], ["irc", "Internet Relay Chat", ""]];
      account_names = ["DeepRoy_xXx", "master_cheif_94", "sohawtritenow", "sorrowman", "thATGuy", "Alex", "James"];
      accounts = [];
      for (i = _i = 0; _i <= 10; i = ++_i) {
        type_idx = Math.floor(Math.random() * account_types.length);
        type = account_types[type_idx];
        name_idx = Math.floor(Math.random() * account_names.length);
        name = account_names[name_idx];
        accounts.push({
          alias: name,
          name: name + type[2],
          protocol: [type[0], type[1]]
        });
      }
      return {
        accounts: accounts,
        selectedAccount: null
      };
    },
    render: function() {
      return div({
        className: 'row with_button main_list'
      }, ConversationSearch());
    }
  });

  window.HummingbeardConversations = Conversations;

  _ref3 = React.DOM, div = _ref3.div, span = _ref3.span, a = _ref3.a;

  MainWindow = React.createClass({
    getInitialState: function() {
      return {
        current: null,
        components: {
          accounts: HummingbeardAccounts(),
          conversations: HummingbeardConversations()
        }
      };
    },
    componentWillMount: function() {
      $("a", this.props.navDom).click((function(_this) {
        return function(e) {
          var page, valid;
          e.preventDefault();
          valid = ['accounts', 'conversations'];
          page = $(e.target).attr('href').substr(1);
          if (__indexOf.call(valid, page) >= 0) {
            $("a.primary", _this.props.navDom).removeClass("primary").addClass("secondary");
            $(e.target).removeClass("secondary").addClass("primary");
            return _this.setState({
              current: page
            });
          }
        };
      })(this));
      return this.setState({
        current: 'accounts'
      });
    },
    render: function() {
      var k, v;
      return div({}, (function() {
        var _ref4, _results;
        _ref4 = this.state.components;
        _results = [];
        for (k in _ref4) {
          v = _ref4[k];
          _results.push(div({
            className: (k === this.state.current ? 'show' : 'hide')
          }, v));
        }
        return _results;
      }).call(this));
    }
  });

  window.HummingbeardMainWindow = MainWindow;

}).call(this);
