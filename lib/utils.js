"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var pro_form_1 = __importStar(require("@ant-design/pro-form"));
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var useState = React.useState;
var confirm = antd_1.Modal.confirm;
var formEnum = {
    DrawerForm: pro_form_1.DrawerForm,
    ModalForm: pro_form_1.ModalForm,
};
var myUtils = {
    getChangesParams: function (row, theOriginRow, addRowkey) {
        var result = {};
        for (var i in theOriginRow) {
            if (row[i] !== undefined) {
                if (theOriginRow[i].toString() !== row[i].toString()) {
                    result[i] = row[i];
                }
            }
        }
        if (addRowkey)
            result[addRowkey.key] = theOriginRow[addRowkey.key];
        return result;
    },
    customFormElement: function (theForms, formProps, formType) { return function (baseProps) {
        var form = antd_1.Form.useForm()[0];
        var children = theForms.map(function (e, index) {
            if (e.renderFormItem) {
                return (React.createElement(pro_form_1.default.Item, __assign({}, e.renderFormItem, { key: index }), e.compt(form)));
            }
            else {
                var TheForm_1 = function () { return e.compt(form); };
                return React.createElement(TheForm_1, { key: index });
            }
        });
        var TheForm = formEnum[formType];
        return (React.createElement(TheForm, __assign({}, formProps, { form: form }), children));
    }; },
    addTrigger: function (props) { return function (baseProps) {
        var forms = props.forms, type = props.type;
        var _a = useState(false), visible = _a[0], setVisible = _a[1];
        var closeParentModal = function () { return forms.length > 1 && setVisible(false); };
        if (forms.length === 1) {
            var _b = forms[0], onFinish = _b.onFinish, title = _b.title, columns = _b.columns, width = _b.width;
            if (forms[0].type === "json")
                return (React.createElement(pro_form_1.BetaSchemaForm, { trigger: React.createElement(antd_1.Tooltip, { title: "\u6DFB\u52A0\u65B0\u7684" + title },
                        React.createElement("a", { className: "anticon", style: { fontSize: "17px" } },
                            React.createElement(icons_1.PlusOutlined, null))), layoutType: type !== null && type !== void 0 ? type : "DrawerForm", onFinish: onFinish, columns: columns, title: "\u6DFB\u52A0\u65B0\u7684" + title, width: width !== null && width !== void 0 ? width : 500 }));
            if (forms[0].type === "custom") {
                var TheForm = myUtils.customFormElement(columns, {
                    trigger: (React.createElement(antd_1.Tooltip, { title: "\u6DFB\u52A0\u65B0\u7684" + title },
                        React.createElement("a", { className: "anticon", style: { fontSize: "17px" } },
                            React.createElement(icons_1.PlusOutlined, null)))),
                    onFinish: onFinish,
                    title: "\u6DFB\u52A0\u65B0\u7684" + title,
                    width: width !== null && width !== void 0 ? width : 500,
                }, type !== null && type !== void 0 ? type : "DrawerForm");
                return React.createElement(TheForm, null);
            }
            else
                return React.createElement(React.Fragment, null);
        }
        else {
            var theBodyForms = forms.map(function (e, index) {
                var onFinish = e.onFinish, title = e.title, columns = e.columns, width = e.width, type = e.type;
                if (type === "json") {
                    return (React.createElement(pro_form_1.BetaSchemaForm, { trigger: React.createElement(antd_1.Button, { type: "dashed", block: true, style: { marginTop: 10 }, size: "large" }, title), layoutType: "DrawerForm", onFinish: function (values) { return __awaiter(void 0, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, onFinish(values)];
                                    case 1:
                                        result = _a.sent();
                                        if (result === true) {
                                            closeParentModal();
                                            return [2, true];
                                        }
                                        else
                                            return [2, false];
                                        return [2];
                                }
                            });
                        }); }, columns: columns, title: "\u6DFB\u52A0\u65B0\u7684" + title, width: width !== null && width !== void 0 ? width : 500, key: type + index }));
                }
                else {
                    var TheCustomForm = myUtils.customFormElement(columns, {
                        trigger: (React.createElement(antd_1.Button, { type: "dashed", block: true, style: { marginTop: 10 }, size: "large" }, title)),
                        onFinish: function (values) {
                            return __awaiter(this, void 0, void 0, function () {
                                var result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, onFinish(values)];
                                        case 1:
                                            result = _a.sent();
                                            if (result === true) {
                                                closeParentModal();
                                                return [2, true];
                                            }
                                            else
                                                return [2, false];
                                            return [2];
                                    }
                                });
                            });
                        },
                        title: "\u6DFB\u52A0\u65B0\u7684" + title,
                        width: width !== null && width !== void 0 ? width : 500,
                    }, "DrawerForm");
                    return React.createElement(TheCustomForm, { key: type + index });
                }
            });
            return (React.createElement(React.Fragment, null,
                React.createElement(antd_1.Tooltip, { title: "\u6DFB\u52A0\u65B0\u7684" + props.title },
                    React.createElement("a", { className: "anticon", style: { fontSize: "17px" }, onClick: function () { return setVisible(true); } },
                        React.createElement(icons_1.PlusOutlined, null))),
                React.createElement(antd_1.Drawer, { title: "\u51C6\u5907\u6DFB\u52A0\u4EE5\u4E0B\u54EA\u79CD" + props.title, width: 500, closable: false, onClose: function () { return setVisible(false); }, visible: visible }, theBodyForms)));
        }
    }; },
    deleteTrigger: function (props, row, action) { return function (baseProps) {
        var content = props.content, onFinish = props.onFinish, triggerText = props.triggerText, isRender = props.isRender;
        if (isRender && !isRender(row))
            return React.createElement(React.Fragment, null);
        var ask = function () {
            confirm({
                title: "移除提醒",
                icon: React.createElement(icons_1.ExclamationCircleOutlined, null),
                content: content !== null && content !== void 0 ? content : "\u4F60\u786E\u5B9A\u8981\u79FB\u9664\u8FD9\u6761\u8BB0\u5F55\u5417\uFF1F",
                okText: "确定",
                okType: "danger",
                cancelText: "取消",
                onOk: function () {
                    return onFinish(row, action);
                },
                onCancel: function () { },
            });
        };
        return React.createElement("a", { onClick: ask }, triggerText !== null && triggerText !== void 0 ? triggerText : "删除");
    }; },
    updateTrigger: function (props, theRowKeyValue, action, columns, editRow, theRowKey) { return function (baseProps) {
        var type = props.type, isPatch = props.isPatch, onFinish = props.onFinish, triggerText = props.triggerText, isRender = props.isRender;
        var theTriggerText = triggerText !== null && triggerText !== void 0 ? triggerText : "编辑";
        var lineClick = function () {
            var _a;
            (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, theRowKeyValue);
        };
        if (isRender && !isRender(editRow))
            return React.createElement(React.Fragment, null);
        if (type === "line")
            return React.createElement("a", { onClick: lineClick }, theTriggerText);
        else {
            return (React.createElement(pro_form_1.BetaSchemaForm, { initialValues: editRow, trigger: React.createElement("a", null, theTriggerText), layoutType: "DrawerForm", onFinish: function (values) {
                    var _a;
                    var originData = __assign((_a = {}, _a[theRowKey !== null && theRowKey !== void 0 ? theRowKey : "id"] = theRowKeyValue, _a), values);
                    var result = originData;
                    if (isPatch) {
                        if (isPatch !== true && isPatch.addKey)
                            result = myUtils.getChangesParams(originData, editRow, {
                                key: theRowKey !== null && theRowKey !== void 0 ? theRowKey : "id",
                            });
                        else
                            result = myUtils.getChangesParams(originData, editRow);
                    }
                    return onFinish(theRowKeyValue, result);
                }, columns: columns.filter(function (p) {
                    delete p.key;
                    if (p.editable === false)
                        p.readonly = true;
                    return p;
                }), title: "\u7F16\u8F91\u6B64\u884C", width: 500 }));
        }
    }; },
};
exports.default = myUtils;
