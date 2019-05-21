webpackHotUpdate("static\\development\\pages\\dashboard\\admin\\users\\blocked.js",{

/***/ "./pages/dashboard/admin/users/blocked.js":
/*!************************************************!*\
  !*** ./pages/dashboard/admin/users/blocked.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_Layout_AdminLayoutHoc__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../components/Layout/AdminLayoutHoc */ "./components/Layout/AdminLayoutHoc.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_Table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../components/Table */ "./components/Table.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../components/Modal */ "./components/Modal.js");
/* harmony import */ var _components_Alert__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/Alert */ "./components/Alert.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_15__);









var _jsxFileName = "D:\\Project\\Web\\fact_client\\pages\\dashboard\\admin\\users\\blocked.js";








var Index =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_8__["default"])(Index, _React$Component);

  function Index(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Index);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Index).call(this, props));
    _this.state = {
      data: [],
      block: {
        id: 0,
        name: '',
        reason_block: 'none'
      },
      total: 0,
      table: {
        pages: 0,
        loading: false,
        header: [{
          title: "#",
          size: "75px"
        }, {
          title: "Profile",
          size: "150px"
        }, {
          title: "Name",
          size: "auto"
        }, {
          title: "Reason",
          size: "auto"
        }, {
          title: "Action",
          size: "200px"
        }]
      },
      alert: {
        block_danger: '',
        block_success: ''
      }
    };
    _this.onBlock = _this.onBlock.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this));
    _this.onRefresh = _this.onRefresh.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this));
    _this.submitBlock = _this.submitBlock.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__["default"])(_this));
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(Index, [{
    key: "onBlock",
    value: function onBlock(user) {
      var block = this.state.block;
      block.id = user.id;
      block.name = user.name;
      this.setState({
        block: block
      });
    }
  }, {
    key: "onRefresh",
    value: function () {
      var _onRefresh = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
        var table, page, response, json, data, total;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                table = this.state.table;
                table.loading = true;
                this.setState({
                  table: table
                });
                page = this.props.router.query.page;
                if (typeof page === "undefined") page = 1;
                _context.next = 7;
                return fetch("http://127.0.0.1:8000/fact/user?status=blocked&page=".concat(page));

              case 7:
                response = _context.sent;
                _context.next = 10;
                return response.json();

              case 10:
                json = _context.sent;
                data = json.results.users;
                total = json.results.total;
                table.pages = json.results.pages;
                table.loading = false;
                this.setState({
                  data: data,
                  table: table,
                  total: total
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onRefresh() {
        return _onRefresh.apply(this, arguments);
      }

      return onRefresh;
    }()
  }, {
    key: "submitBlock",
    value: function () {
      var _submitBlock = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
        var alert, body, response, json, block;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                alert = this.state.alert;
                body = _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(this.state.block);
                _context2.next = 4;
                return fetch("http://127.0.0.1:8000/fact/user/" + this.state.block.id, {
                  method: 'DELETE',
                  body: body
                });

              case 4:
                response = _context2.sent;
                _context2.next = 7;
                return response.json();

              case 7:
                json = _context2.sent;

                if (!(typeof json.message === 'undefined' || json.message !== 'Success')) {
                  _context2.next = 14;
                  break;
                }

                alert.block_danger = "500 — Internal Server Error";
                _context2.next = 12;
                return this.setState({
                  alert: alert
                });

              case 12:
                _context2.next = 20;
                break;

              case 14:
                alert.block_success = "Block User, " + this.state.block.name + " — Success";
                block = {
                  id: 0,
                  name: '',
                  reason_block: 'none'
                };
                _context2.next = 18;
                return this.setState({
                  alert: alert,
                  block: block
                });

              case 18:
                _context2.next = 20;
                return this.onRefresh();

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function submitBlock() {
        return _submitBlock.apply(this, arguments);
      }

      return submitBlock;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.onRefresh();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var tbody = [];

      var _loop = function _loop(i, l) {
        var user = _this2.state.data[i];
        tbody.push(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("tr", {
          key: user.id,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 100
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 101
          },
          __self: this
        }, i + 1), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 102
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("i", {
          className: "fa fa-user-circle",
          style: {
            fontSize: "50px"
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 103
          },
          __self: this
        })), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 105
          },
          __self: this
        }, user.name), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 106
          },
          __self: this
        }, user.reason_block), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 107
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("button", {
          className: "btn btn-link text-danger",
          "data-toggle": "modal",
          "data-target": "#unblock",
          onClick: function onClick() {
            return _this2.onBlock(user);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 108
          },
          __self: this
        }, "Unblock"))));
      };

      for (var i = 0, l = this.state.data.length; i < l; i++) {
        _loop(i, l);
      }

      return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_Layout_AdminLayoutHoc__WEBPACK_IMPORTED_MODULE_10__["default"], {
        contentTitle: "Blocked Users (".concat(this.state.total, ")"),
        contentBreadcrumb: ["Home", "Users", "Blocked Users"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_Alert__WEBPACK_IMPORTED_MODULE_14__["default"], {
        type: "danger",
        component: this,
        attribute: "block_danger",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_Alert__WEBPACK_IMPORTED_MODULE_14__["default"], {
        type: "success",
        component: this,
        attribute: "block_success",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_Table__WEBPACK_IMPORTED_MODULE_12__["default"], {
        table: this.state.table,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }, tbody), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_Modal__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "unblock",
        title: "Unblock User",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "modal-body",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("p", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        },
        __self: this
      }, "Are you sure you want to unblock ", this.state.block.name, "?")), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "modal-footer",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "col-md-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("button", {
        type: "button",
        className: "btn btn-danger btn-block",
        "data-dismiss": "modal",
        "data-toggle": "modal",
        onClick: this.submitBlock,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        },
        __self: this
      }, "Yes")), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "col-md-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("button", {
        type: "button",
        className: "btn btn-light btn-block",
        "data-dismiss": "modal",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        },
        __self: this
      }, "No")))));
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_15__["withRouter"])(Index));

/***/ })

})
//# sourceMappingURL=blocked.js.971b4ce5a675a07914a5.hot-update.js.map