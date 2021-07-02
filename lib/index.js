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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var pro_table_1 = require("@ant-design/pro-table");
var utils_1 = __importDefault(require("./utils"));
var useState = React.useState, useEffect = React.useEffect;
var tuyeeTable = function (originProps) {
    var toolBarRender = originProps.toolBarRender, cudProps = originProps.cudProps, headerTitle = originProps.headerTitle, columns = originProps.columns, options = originProps.options, scroll = originProps.scroll;
    var _a = useState(originProps), props = _a[0], setProps = _a[1];
    var _b = useState([]), editRows = _b[0], setEditRows = _b[1];
    useEffect(function () {
        var tableProps = __assign({}, props);
        tableProps.options = options !== null && options !== void 0 ? options : {};
        tableProps.recordCreatorProps = false;
        tableProps.scroll = scroll !== null && scroll !== void 0 ? scroll : { scrollToFirstRowOnChange: true, x: true };
        var isNeedToolBar = (cudProps === null || cudProps === void 0 ? void 0 : cudProps.post) !== undefined ||
            toolBarRender !== undefined ||
            headerTitle !== undefined;
        if (!isNeedToolBar) {
            tableProps.toolBarRender = false;
        }
        else {
            tableProps.tableStyle = { paddingBottom: 20 };
            tableProps.toolBarRender = function (action, row) {
                var origin = toolBarRender ? toolBarRender(action, row) : [];
                var add = [];
                if (cudProps && cudProps.post) {
                    var TheAdd = utils_1.default.addTrigger(cudProps.post);
                    add = [React.createElement(TheAdd, { key: "1" })];
                }
                return __spreadArray(__spreadArray([], origin), add);
            };
        }
        if (cudProps && cudProps.update) {
            var _a = cudProps.update, onFinish_1 = _a.onFinish, type = _a.type, isPatch_1 = _a.isPatch;
            if (type === "line") {
                tableProps.editable = {
                    type: "single",
                    actionRender: function (row, config, dom) { return [
                        dom.save,
                        dom.cancel,
                    ]; },
                    onChange: function (_, editableRows) {
                        if (editableRows.length > 0)
                            setEditRows(editableRows);
                    },
                    onSave: function (key, changes) {
                        var data = changes;
                        if (isPatch_1) {
                            if (isPatch_1 !== true && isPatch_1.addKey)
                                data = utils_1.default.getChangesParams(changes, editRows[0], {
                                    key: tableProps.rowKey,
                                });
                            else
                                data = utils_1.default.getChangesParams(changes, editRows[0]);
                        }
                        return onFinish_1(key, data);
                    },
                };
            }
        }
        if (columns) {
            var originOptions_1 = columns.filter(function (p) { return p.valueType === "option"; });
            tableProps.columns = __spreadArray([], columns.filter(function (p) { return p.valueType !== "option"; }));
            if (originOptions_1.length > 0 ||
                (cudProps && cudProps.update) ||
                (cudProps && cudProps.delete)) {
                tableProps.columns.push({
                    title: "操作",
                    valueType: "option",
                    render: function (dom, row, index, action, schema) {
                        var result = [];
                        for (var _i = 0, originOptions_2 = originOptions_1; _i < originOptions_2.length; _i++) {
                            var e = originOptions_2[_i];
                            if (e.render)
                                result.push(e.render(dom, row, index, action, schema));
                        }
                        if (cudProps && cudProps.update) {
                            var TheUpdate = utils_1.default.updateTrigger(cudProps.update, row[tableProps.rowKey], action, columns, row, tableProps.rowKey);
                            result.push(React.createElement(TheUpdate, { key: "update" + index }));
                        }
                        if (cudProps && cudProps.delete) {
                            var TheDelete = utils_1.default.deleteTrigger(cudProps.delete, row, action);
                            result.push(React.createElement(TheDelete, { key: "delete" + index }));
                        }
                        return result;
                    },
                });
            }
        }
        setProps(tableProps);
    }, [editRows]);
    return React.createElement(pro_table_1.EditableProTable, __assign({}, props));
};
exports.default = tuyeeTable;
