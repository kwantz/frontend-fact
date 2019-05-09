webpackHotUpdate("static\\development\\pages\\dashboard\\admin\\newsfeed\\articles.js",{

/***/ "./components/DashboardArticle/ViewLists.js":
/*!**************************************************!*\
  !*** ./components/DashboardArticle/ViewLists.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Layout_AdminLayoutHoc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Layout/AdminLayoutHoc */ "./components/Layout/AdminLayoutHoc.js");
/* harmony import */ var _SearchInput__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../SearchInput */ "./components/SearchInput.js");
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Table */ "./components/Table.js");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../Modal */ "./components/Modal.js");
/* harmony import */ var _Alert__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../Alert */ "./components/Alert.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_15__);








var _jsxFileName = "D:\\Project\\Web\\fact_client\\components\\DashboardArticle\\ViewLists.js";










var Index =
/*#__PURE__*/
function (_React$Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_7__["default"])(Index, _React$Component);

  function Index(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Index);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Index).call(this, props));
    _this.state = {
      data: [],
      search: '',
      total: 0,
      table: {
        pages: 0,
        loading: false,
        header: [{
          title: "#",
          size: "50px"
        }, {
          title: "Title",
          size: "auto"
        }, {
          title: "Author",
          size: "auto"
        }, {
          title: "Published on",
          size: "auto"
        }, {
          title: "Published by",
          size: "auto"
        }, {
          title: "Action",
          size: "200px"
        }]
      },
      delete: {
        id: -1,
        title: ""
      },
      alert: {
        delete_danger: '',
        delete_success: ''
      }
    };
    _this.onRefresh = _this.onRefresh.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));
    _this.queryTitle = _this.queryTitle.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));
    _this.deleteArticle = _this.deleteArticle.bind(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__["default"])(_this));
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Index, [{
    key: "onRefresh",
    value: function () {
      var _onRefresh = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var table, _this$props$router$qu, page, title, response, json, data, total;

        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                table = this.state.table;
                table.loading = true;
                _context.next = 4;
                return this.setState({
                  table: table
                });

              case 4:
                _this$props$router$qu = this.props.router.query, page = _this$props$router$qu.page, title = _this$props$router$qu.title;
                if (typeof page === "undefined") page = 1;
                if (typeof title === "undefined") title = "";
                _context.next = 9;
                return fetch("http://127.0.0.1:8000/fact/article?page=".concat(page, "&title=").concat(title));

              case 9:
                response = _context.sent;
                _context.next = 12;
                return response.json();

              case 12:
                json = _context.sent;
                data = json.results.articles;
                total = json.results.total;
                table.pages = json.results.pages;
                table.loading = false;
                this.setState({
                  data: data,
                  table: table,
                  total: total
                });

              case 18:
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
    key: "componentDidMount",
    value: function componentDidMount() {
      this.onRefresh();
    }
  }, {
    key: "queryTitle",
    value: function () {
      var _queryTitle = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return next_router__WEBPACK_IMPORTED_MODULE_15___default.a.push({
                  pathname: '/dashboard/admin/newsfeed/articles',
                  query: {
                    page: 1,
                    title: this.state.search
                  }
                });

              case 2:
                this.onRefresh();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function queryTitle() {
        return _queryTitle.apply(this, arguments);
      }

      return queryTitle;
    }()
  }, {
    key: "deleteArticle",
    value: function deleteArticle(article) {
      var data = this.state.delete;
      data.id = article.id;
      data.title = article.title;
      this.setState({
        delete: data
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var tbody = [];

      var _loop = function _loop(i, l) {
        var article = _this2.state.data[i];
        var date = new Date(article.published_on);
        tbody.push(react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("tr", {
          key: article.id,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 94
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 95
          },
          __self: this
        }, i + 1), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 96
          },
          __self: this
        }, article.title), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 97
          },
          __self: this
        }, article.author), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 98
          },
          __self: this
        }, date.dateformat()), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 99
          },
          __self: this
        }, article.published_by), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("td", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 100
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_14___default.a, {
          href: "/dashboard/admin/newsfeed/articles?status=view&id=".concat(article.id),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 101
          },
          __self: this
        }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
          className: "btn btn-link",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 102
          },
          __self: this
        }, "View")), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
          className: "btn btn-link text-danger ml-3",
          "data-toggle": "modal",
          "data-target": "#delete",
          onClick: function onClick() {
            return _this2.deleteArticle(article);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 104
          },
          __self: this
        }, "Delete"))));
      };

      for (var i = 0, l = this.state.data.length; i < l; i++) {
        _loop(i, l);
      }

      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_Layout_AdminLayoutHoc__WEBPACK_IMPORTED_MODULE_9__["default"], {
        contentTitle: "Articles (".concat(this.state.total, ")"),
        contentBreadcrumb: ["Home", "Newsfeed", "Articles"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_Alert__WEBPACK_IMPORTED_MODULE_13__["default"], {
        type: "danger",
        component: this,
        attribute: "delete_danger",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_Alert__WEBPACK_IMPORTED_MODULE_13__["default"], {
        type: "success",
        component: this,
        attribute: "delete_success",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "card",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "card-body",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("form", {
        className: "form-inline",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_SearchInput__WEBPACK_IMPORTED_MODULE_10__["default"], {
        placeholder: "Search by title",
        onClick: this.queryTitle,
        value: this.state.search,
        onChange: function onChange(event) {
          return _this2.setState({
            search: event.target.value
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_14___default.a, {
        href: "/dashboard/admin/newsfeed/articles?status=add",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("a", {
        className: "btn btn-info ml-auto",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("i", {
        className: "fa fa-plus",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        },
        __self: this
      }), " Add Article"))))), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_Table__WEBPACK_IMPORTED_MODULE_11__["default"], {
        table: this.state.table,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        },
        __self: this
      }, tbody), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_Modal__WEBPACK_IMPORTED_MODULE_12__["default"], {
        id: "delete",
        title: "Delete Article",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "modal-body",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        },
        __self: this
      }, "Are you sure you want to delete ", this.state.delete.title, "?")), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "modal-footer",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "col-md-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "button",
        className: "btn btn-light btn-block",
        "data-dismiss": "modal",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        },
        __self: this
      }, "No")), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "col-md-6",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("button", {
        type: "button",
        className: "btn btn-danger btn-block",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        },
        __self: this
      }, "Yes")))));
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_8___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Object(next_router__WEBPACK_IMPORTED_MODULE_15__["withRouter"])(Index));

/***/ })

})
//# sourceMappingURL=articles.js.d678491b42bc247350fe.hot-update.js.map