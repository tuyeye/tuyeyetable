/*eslint-disable*/
import * as React from "react";
import type {
    postProps,
    deleteProps,
    updateProps,
    CustomForm,
    comptsBaseProps,
} from "./types";
import ProForm, {
    BetaSchemaForm,
    DrawerForm,
    DrawerFormProps,
    ProFormColumnsType,
    ModalForm,
    ModalFormProps,
} from "@ant-design/pro-form";
import { Tooltip, Drawer, Button, Modal, Form } from "antd";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ActionType } from "@ant-design/pro-table";

const { useState } = React;

const { confirm } = Modal;

const formEnum = {
    DrawerForm: DrawerForm,
    ModalForm: ModalForm,
};

const myUtils = {
    /**
     * 獲取修改後的數據，patch 專用
     * @param row 修改後的數據
     * @param theOriginRow 原始數據
     * @param addRowkey 是否需要添加主鍵字段
     */
    getChangesParams: (
        row: any,
        theOriginRow: any,
        addRowkey?: { key: string }
    ) => {
        let result: any = {};

        for (var i in theOriginRow) {
            if (row[i] !== undefined) {
                if (theOriginRow[i].toString() !== row[i].toString()) {
                    result[i] = row[i];
                }
            }
        }

        if (addRowkey) result[addRowkey.key] = theOriginRow[addRowkey.key];

        return result;
    },

    /**
     * 渲染一個自定義表單組件
     * @param theForms 自定義表單集合
     * @param formProps 外層Form組件的props
     * @param formType 外層Form類型，ModalForm 或 DrawerForm
     */
    customFormElement: (
        theForms: CustomForm[],
        formProps: ModalFormProps | DrawerFormProps,
        formType: "DrawerForm" | "ModalForm"
    ) => (baseProps: comptsBaseProps) => {
        const [form] = Form.useForm();

        const children = theForms.map((e, index) => {
            if (e.renderFormItem) {
                return (
                    <ProForm.Item {...e.renderFormItem} key={index}>
                        {e.compt(form)}
                    </ProForm.Item>
                );
            } else {
                const TheForm = () => e.compt(form);
                return <TheForm key={index} />;
            }
        });

        const TheForm: any = formEnum[formType];

        return (
            <TheForm {...formProps} form={form}>
                {children}
            </TheForm>
        );
    },

    /**
     * 渲染添加數據按鈕
     * @param props post的Props
     */
    addTrigger: (props: postProps) => (baseProps: comptsBaseProps) => {
        const { forms, type } = props;
        const [visible, setVisible] = useState<boolean>(false);

        //关闭父级Modal
        const closeParentModal = () => forms.length > 1 && setVisible(false);
        //單個渲染
        if (forms.length === 1) {
            const { onFinish, title, columns, width } = forms[0];

            //jsong格式
            if (forms[0].type === "json")
                return (
                    <BetaSchemaForm
                        trigger={
                            <Tooltip title={`添加新的${title}`}>
                                <a className="anticon" style={{ fontSize: "17px" }}>
                                    <PlusOutlined />
                                </a>
                            </Tooltip>
                        }
                        layoutType={type ?? "DrawerForm"}
                        onFinish={onFinish}
                        columns={columns as ProFormColumnsType<any, any>[]}
                        title={`添加新的${title}`}
                        width={width ?? 500}
                    />
                );
            //自定义格式
            if (forms[0].type === "custom") {
                const TheForm = myUtils.customFormElement(
                    columns as CustomForm[],
                    {
                        trigger: (
                            <Tooltip title={`添加新的${title}`}>
                                <a className="anticon" style={{ fontSize: "17px" }}>
                                    <PlusOutlined />
                                </a>
                            </Tooltip>
                        ),
                        onFinish,
                        title: `添加新的${title}`,
                        width: width ?? 500,
                    },
                    type ?? "DrawerForm"
                );
                return <TheForm />;
            } else return <></>;
        } else {
            const theBodyForms = forms.map((e, index) => {
                const { onFinish, title, columns, width, type } = e;
                if (type === "json") {
                    return (
                        <BetaSchemaForm
                            trigger={
                                <Button
                                    type="dashed"
                                    block
                                    style={{ marginTop: 10 }}
                                    size="large"
                                >
                                    {title}
                                </Button>
                            }
                            layoutType="DrawerForm"
                            onFinish={async (values) => {
                                const result = await onFinish(values);
                                if (result === true) {
                                    closeParentModal();
                                    return true;
                                } else return false;
                            }}
                            columns={columns as ProFormColumnsType<any, any>[]}
                            title={`添加新的${title}`}
                            width={width ?? 500}
                            key={type + index}
                        />
                    );
                } else {
                    const TheCustomForm = myUtils.customFormElement(
                        columns as CustomForm[],
                        {
                            trigger: (
                                <Button
                                    type="dashed"
                                    block
                                    style={{ marginTop: 10 }}
                                    size="large"
                                >
                                    {title}
                                </Button>
                            ),
                            async onFinish(values) {
                                const result = await onFinish(values);
                                if (result === true) {
                                    closeParentModal();
                                    return true;
                                } else return false;
                            },
                            title: `添加新的${title}`,
                            width: width ?? 500,
                        },
                        "DrawerForm"
                    );
                    return <TheCustomForm key={type + index} />;
                }
            });

            return (
                <>
                    <Tooltip title={`添加新的${props.title}`}>
                        <a
                            className="anticon"
                            style={{ fontSize: "17px" }}
                            onClick={() => setVisible(true)}
                        >
                            <PlusOutlined />
                        </a>
                    </Tooltip>
                    <Drawer
                        title={`准备添加以下哪种${props.title}`}
                        width={500}
                        closable={false}
                        onClose={() => setVisible(false)}
                        visible={visible}
                    >
                        {theBodyForms}
                    </Drawer>
                </>
            );
        }
    },

    /**
     * 渲染刪除按鈕
     * @param props  delete的Props
     * @param row 當前行
     * @param action tableAction
     */
    deleteTrigger: (
        props: deleteProps,
        row: any,
        action: ActionType | undefined
    ) => (baseProps: comptsBaseProps) => {
        const { content, onFinish, triggerText, isRender } = props;

        if (isRender && !isRender(row)) return <></>;

        const ask = () => {
            confirm({
                title: "移除提醒",
                icon: <ExclamationCircleOutlined />,
                content: content ?? `你确定要移除这条记录吗？`,
                okText: "确定",
                okType: "danger",
                cancelText: "取消",
                onOk() {
                    return onFinish(row, action);
                },
                onCancel() { },
            });
        };

        return <a onClick={ask}>{triggerText ?? "删除"}</a>;
    },

    /**
     * 渲染更新按鈕
     * @param props update的Props
     * @param theRowKeyValue 當前行的主鍵值
     * @param action tableAction
     * @param columns table的columns
     * @param editRow 正在編輯的行
     * @param theRowKey 主鍵字段名稱
     */
    updateTrigger: (
        props: updateProps,
        theRowKeyValue: string,
        action: ActionType | undefined,
        columns: any[],
        editRow: object,
        theRowKey?: string
    ) => (baseProps: comptsBaseProps) => {
        const { type, isPatch, onFinish, triggerText, isRender } = props;

        const theTriggerText = triggerText ?? "编辑";

        const lineClick = () => {
            action?.startEditable?.(theRowKeyValue);
        };
        
        if (isRender && !isRender(editRow)) return <></>;
        
        if (type === "line") return <a onClick={lineClick}>{theTriggerText}</a>;
        else {
            return (
                <BetaSchemaForm
                    initialValues={editRow}
                    trigger={<a>{theTriggerText}</a>}
                    layoutType="DrawerForm"
                    onFinish={(values: object) => {
                        let originData: any = {
                            [theRowKey ?? "id"]: theRowKeyValue,
                            ...values,
                        };

                        let result = originData;
                        if (isPatch) {
                            if (isPatch !== true && isPatch.addKey)
                                result = myUtils.getChangesParams(originData, editRow, {
                                    key: theRowKey ?? "id",
                                });
                            else result = myUtils.getChangesParams(originData, editRow);
                        }

                        return onFinish(theRowKeyValue, result);
                    }}
                    columns={columns.filter((p) => {
                        delete p.key;
                        if (p.editable === false) p.readonly = true;
                        return p;
                    })}
                    title={`编辑此行`}
                    width={500}
                />
            );
        }
    },
};

export default myUtils;
/*eslint-disable*/
