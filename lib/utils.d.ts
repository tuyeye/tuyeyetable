/// <reference types="react" />
import type { postProps, deleteProps, updateProps, CustomForm, comptsBaseProps } from "./types";
import { DrawerFormProps, ModalFormProps } from "@ant-design/pro-form";
import { ActionType } from "@ant-design/pro-table";
declare const myUtils: {
    getChangesParams: (row: any, theOriginRow: any, addRowkey?: {
        key: string;
    } | undefined) => any;
    customFormElement: (theForms: CustomForm[], formProps: ModalFormProps | DrawerFormProps, formType: "DrawerForm" | "ModalForm") => (baseProps: comptsBaseProps) => JSX.Element;
    addTrigger: (props: postProps) => (baseProps: comptsBaseProps) => JSX.Element;
    deleteTrigger: (props: deleteProps, row: any, action: ActionType | undefined) => (baseProps: comptsBaseProps) => JSX.Element;
    updateTrigger: (props: updateProps, theRowKeyValue: string, action: ActionType | undefined, columns: any[], editRow: object, theRowKey?: string | undefined) => (baseProps: comptsBaseProps) => JSX.Element;
};
export default myUtils;
