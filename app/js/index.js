(function() {
  var AccountsBox, AccountsItem, ContactItem, ContactsBox, ConversationBox, ConversationItem, ConversationSearch, MainWindow, a, br, button, div, h1, i, img, input, label, p, span, _ref, _ref1, _ref2, _ref3,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = React.DOM, div = _ref.div, span = _ref.span, button = _ref.button, img = _ref.img, h1 = _ref.h1, input = _ref.input, label = _ref.label, i = _ref.i, p = _ref.p;

  AccountsItem = React.createClass({
    getInitialState: function() {
      var color, hexValues;
      hexValues = '0123456789ABCDEF'.split('');
      color = '#';
      [0, 1, 2, 3, 4, 5].map(function(i) {
        return color += hexValues[Math.floor(Math.random() * hexValues.length)];
      });
      return {
        color: color,
        footerDisplay: 'none'
      };
    },
    toggleFooter: function() {
      return this.setState({
        footerDisplay: this.state.footerDisplay === 'block' ? 'none' : 'block'
      });
    },
    render: function() {
      return div({
        className: 'card'
      }, div({
        className: 'card-content',
        style: {
          background: this.state.color
        },
        onClick: this.toggleFooter
      }, span({
        className: 'card-title'
      }, this.props.account.username), p({}, this.props.account.protocol)), div({
        className: 'card-footer',
        style: {
          display: this.state.footerDisplay
        }
      }, p({}, 'Status: ', span({}, this.props.account.status), div({
        className: 'row'
      }, div({
        className: 's6 col'
      }, button({
        className: 'waves-effect waves-light btn'
      }, 'Edit')), div({
        className: 's6 col',
        style: {
          'text-align': 'right'
        }
      }, input({
        type: 'checkbox',
        id: "account-" + this.props.account.guid + "-enabled"
      }), label({
        htmlFor: "account-" + this.props.account.guid + "-enabled"
      }, 'Enable Account'))))));
    }
  });

  AccountsBox = React.createClass({
    render: function() {
      return div({
        className: 'row'
      }, div({
        className: 's12 col'
      }, [0, 1, 2, 3, 4, 5].map(function(i) {
        return AccountsItem({
          key: i,
          account: {
            guid: "0000-ABCD-000" + i,
            username: 'alex.barry@gmail.com',
            protocol: 'Google Hangouts'
          }
        });
      })), div({
        className: 's12 col',
        style: {
          'text-align': 'center',
          'font-size': '1.5em'
        }
      }, a({
        href: '',
        className: 'btn-floating',
        title: 'Add Account'
      }, i({
        className: 'mdi-content-add'
      }))));
    }
  });

  window.HummingbeardAccounts = AccountsBox;

  _ref1 = React.DOM, div = _ref1.div, span = _ref1.span, button = _ref1.button, img = _ref1.img, h1 = _ref1.h1, input = _ref1.input, label = _ref1.label, i = _ref1.i, p = _ref1.p, br = _ref1.br;

  ContactItem = React.createClass({
    getInitialState: function() {
      var color, hexValues;
      hexValues = '0123456789ABCDEF'.split('');
      color = '#';
      [0, 1, 2, 3, 4, 5].map(function(i) {
        return color += hexValues[Math.floor(Math.random() * hexValues.length)];
      });
      return {
        color: color,
        footerDisplay: 'none'
      };
    },
    toggleFooter: function() {
      return this.setState({
        footerDisplay: this.state.footerDisplay === 'block' ? 'none' : 'block'
      });
    },
    render: function() {
      return div({
        className: 'card'
      }, div({
        className: 'card-content',
        style: {
          background: this.state.color
        },
        onClick: this.toggleFooter
      }, span({
        className: 'card-title'
      }, this.props.contact.username), p({}, this.props.contact.status), p({}, this.props.contact.account.protocol)), div({
        className: 'card-footer',
        style: {
          display: this.state.footerDisplay
        }
      }, p({}, div({
        className: 'row'
      }, div({
        className: 's8 col'
      }, button({
        className: 'waves-effect waves-light btn'
      }, 'Edit')), div({
        className: 's4 col'
      }, input({
        type: 'checkbox',
        id: "contact-" + this.props.contact.guid + "-enabled"
      }), label({
        htmlFor: "contact-" + this.props.contact.guid + "-enabled"
      }, 'Enabled'), br({}), input({
        type: 'checkbox',
        id: "contact-" + this.props.contact.guid + "-notifications"
      }), label({
        htmlFor: "contact-" + this.props.contact.guid + "-notifications"
      }, 'Notifications'))))));
    }
  });

  ContactsBox = React.createClass({
    render: function() {
      return div({
        className: 'row'
      }, div({
        className: 's12 col'
      }, [0, 1, 2, 3, 4, 5].map(function(i) {
        return ContactItem({
          key: i,
          contact: {
            guid: "0000-ABCD-000" + i,
            username: 'alex.barry@gmail.com',
            status: 'Online',
            account: {
              protocol: 'Google Hangouts'
            }
          }
        });
      })), div({
        className: 's12 col',
        style: {
          'text-align': 'center',
          'font-size': '1.5em'
        }
      }, br({}), a({
        href: '',
        className: 'btn-floating',
        title: 'Add Account'
      }, i({
        className: 'mdi-social-person-add'
      }))));
    }
  });

  window.HummingbeardContacts = ContactsBox;

  _ref2 = React.DOM, div = _ref2.div, span = _ref2.span, button = _ref2.button, img = _ref2.img, h1 = _ref2.h1, input = _ref2.input, label = _ref2.label, i = _ref2.i, p = _ref2.p, br = _ref2.br;

  ConversationSearch = React.createClass({
    displayOptions: function(e) {
      var container;
      e.preventDefault();
      container = this.refs.moreOptions.getDOMNode();
      return container.style.display = container.style.display === 'none' ? 'block' : 'none';
    },
    render: function() {
      return div({
        className: 's12 cols'
      }, div({
        className: 'card z-depth-2'
      }, div({
        className: 'card-content'
      }, span({
        className: 'card-title black-text'
      }, 'Find Conversation'), p({}, input({
        type: 'text',
        placeholder: 'Search Conversations',
        ref: 'input'
      }), div({
        style: {
          display: 'none'
        },
        ref: 'moreOptions'
      }, input({
        id: 'show_online_only',
        type: 'checkbox'
      }), label({
        htmlFor: 'show_online_only'
      }, "Show from online accounts only"), br({}), input({
        id: 'hide_archived',
        type: 'checkbox'
      }), label({
        htmlFor: 'hide_archived'
      }, "Hide archived conversations")))), div({
        className: 'card-action'
      }, a({
        href: '',
        onClick: this.displayOptions,
        ref: 'displayOptions'
      }, 'More options...'))));
    }
  });

  ConversationItem = React.createClass({
    getInitialState: function() {
      var color, hexValues;
      hexValues = '0123456789ABCDEF'.split('');
      color = '#';
      [0, 1, 2, 3, 4, 5].map(function(i) {
        return color += hexValues[Math.floor(Math.random() * hexValues.length)];
      });
      return {
        color: color,
        footerDisplay: 'none'
      };
    },
    toggleFooter: function() {
      return this.setState({
        footerDisplay: this.state.footerDisplay === 'block' ? 'none' : 'block'
      });
    },
    render: function() {
      return div({
        className: 'card'
      }, div({
        className: 'card-content',
        style: {
          background: this.state.color,
          position: 'relative'
        },
        onClick: this.toggleFooter
      }, a({
        href: '',
        style: {
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: 64,
          'background-color': 'rgba(255,255,255,0.4)',
          'text-align': 'center'
        }
      }, span({
        style: {
          '-webkit-transform': 'rotate(-90deg)',
          display: 'block',
          float: 'left',
          width: '100%',
          height: '50%'
        }
      }, 'Open', br({}), 'Conversation')), span({
        className: 'card-title'
      }, this.props.contact.username), p({}, this.props.contact.status), p({}, this.props.contact.account.protocol)), div({
        className: 'card-footer',
        style: {
          display: this.state.footerDisplay
        }
      }, p({}, div({
        className: 'row'
      }, div({
        className: 's8 col'
      }, a({
        href: '',
        className: 'waves-effect waves-light btn'
      }, 'Archive Conversation')), div({
        className: 's4 col'
      }, input({
        type: 'checkbox',
        id: "conversation-" + this.props.contact.guid + "-notifications"
      }), label({
        htmlFor: "conversation-" + this.props.contact.guid + "-notifications"
      }, 'Notifications'))))));
    }
  });

  ConversationBox = React.createClass({
    render: function() {
      return div({
        className: 'row'
      }, div({
        className: 's12 col'
      }, ConversationSearch({})), div({
        className: 's12 col'
      }, [0, 1, 2, 3, 4, 5].map(function(i) {
        return ConversationItem({
          key: i,
          contact: {
            guid: "0000-ABCD-000" + i,
            username: 'alex.barry@gmail.com',
            status: 'Online',
            account: {
              protocol: 'Google Hangouts'
            }
          }
        });
      })), div({
        className: 's12 col',
        style: {
          'text-align': 'center',
          'font-size': '1.5em'
        }
      }, br({}, a({
        href: '',
        className: 'btn-floating',
        title: 'Add Account'
      }, i({
        className: 'mdi-social-person-add'
      })))));
    }
  });

  window.HummingbeardConversations = ConversationBox;

  _ref3 = React.DOM, div = _ref3.div, span = _ref3.span, a = _ref3.a;

  MainWindow = React.createClass({
    getInitialState: function() {
      return {
        current: null,
        components: {
          accounts: HummingbeardAccounts(),
          contacts: HummingbeardContacts()
        }
      };
    },
    componentWillMount: function() {
      $("a", this.props.navDom).click((function(_this) {
        return function(e) {
          var page, valid;
          e.preventDefault();
          valid = ['accounts', 'contacts'];
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
        current: 'contacts'
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
            key: k,
            className: (k === this.state.current ? 'show' : 'hide')
          }, v));
        }
        return _results;
      }).call(this));
    }
  });

  window.HummingbeardMainWindow = MainWindow;

  window.HummingbeardActions = window.HummingbeardActions || {};

  window.HummingbeardActions.Account = Reflux.createActions(['stateChange', 'statusChange', 'login', 'logout', 'contactStateChange', 'contactStatusChange']);

  window.HummingbeardActions = window.HummingbeardActions || {};

  window.HummingbeardActions.Ui = Reflux.createActions(['tabChanged', 'cardClickShort', 'cardClickLong']);

  $(document).ready(function() {
    React.renderComponent(HummingbeardConversations(), document.getElementById('conversations'));
    React.renderComponent(HummingbeardContacts(), document.getElementById('contacts'));
    $('ul.tabs').tabs();
    return $('.card-content, .card-content *').mousedown(function(e) {
      return $(this).data('mouse-down', Date.now());
    }).mouseup(function(e) {
      var total;
      total = Date.now() - $(this).data('mouse-down');
      if (total <= 150) {
        return $(this).parent(".card").find(".card-footer a:first").trigger('click');
      } else {
        return $(this).parent(".card").children(".card-footer").toggle();
      }
    });
  });

}).call(this);
