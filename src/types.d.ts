import * as  React from 'react';
import { ActionType, ProTableProps } from '@ant-design/pro-table';
import type { ProFormColumnsType, ProFormLayoutType, FormItemProps } from '@ant-design/pro-form';
import { FormInstance } from 'antd';
import TuyeeTable from './index';

/**
 * 基礎的屬性，比如 key 等等
 */
export type comptsBaseProps = {
    key?: React.Key | null | undefined;
}

/**
 * 單個自定義表單Item的配置項
 * @param type 類型，antdForm（antd自帶的表單組件） 或者 custom（自定義的組件）
 * @param compt 組件，JSX.Element 類型，和 type 一一對應，如果為 antdForm 則不會附帶 form ，如果是 custom（自定義的組件），則會提供一個 form 來控制 form 的參數
 */
export declare type CustomForm = {

    /**
     * 是否需要渲染 FormItem，如果需要請傳遞 FormItemProps；
     */
    renderFormItem?: FormItemProps;

    /**
     * 表單組件，支持任意的 JSX.Element
     * @param form 表單受控 form 參數，可通過此參數控制 form，詳細用法見 antd 官網
     */
    compt: (form: FormInstance) => JSX.Element;
};

/**
 * 添加按鈕的對應表單集合
 * @param title 此項表單的標題
 * @param type json（官方自帶表單，不需要自定義組件內嵌時使用， 和 table 的 columns 配置項語法相同） 、custom（自定義表單，需要自定義組件來實現最終的表單的數據時使用）
 * @param onFinish 表單提交回調方法，Promise<boolean> ，請返回 true 或者false
 * @param width 可選，表單的寬度
 */
export declare type formsSingle = {
    /** 此項表單的標題 */
    title: string;
    /** json（官方自帶表單，不需要自定義組件內嵌時使用， 和 table 的 columns 配置項語法相同） 、custom（自定義表單，需要自定義組件來實現最終的表單的數據時使用） */
    type: 'json' | 'custom';
    /** 根據你選的type，來填入對應類型的表單項 */
    columns: ProFormColumnsType<any, any>[] | CustomForm[];
    /** 表單提交回調方法，Promise<boolean> ，請返回 true 或者false */
    onFinish: (params: any) => Promise<boolean>;
    /** 可選，表單的寬度 */
    width?: number;
}

/**
 * 添加表單的配置項目
 * @param forms 表單數組
 * @param title 添加的默認標題
 * @param type 類型，ModalForm 或者 DrawerForm，默認 DrawerForm
 */
export declare type postProps = {
    /** 表單數組 */
    forms: formsSingle[];
    /** 添加的默認標題 */
    title: string;
    /** 類型，ModalForm 或者 DrawerForm，默認 DrawerForm */
    type?: 'ModalForm' | 'DrawerForm';
};


/**
 * 刪除按鈕的配置項目
 * @param onFinish 點擊確定後的回調，（row：當前行的數據，action：tableAction），請返回 boolean 類型
 * @param content 提示內容
 * @param triggerText 觸發彈窗按鈕的文字配置
 */
export declare type deleteProps = {
    /** 點擊確定後的回調，（row：當前行的數據，action：tableAction），請返回 boolean 類型 */
    onFinish: (row: any, action: ActionType | undefined) => Promise<boolean>;
    /** 提示內容 */
    content?: string;
    /** 觸發彈窗按鈕的文字配置 */
    triggerText?: string;
};

/**
 * 更新按鈕的配置項目
 * @param  onFinish 點擊確定後的回調，（key：更新行的主鍵的值，changes：修改後的數據），請返回 boolean 類型
 * @param type 類型，支持 行內編輯 和 抽屜彈出表單編輯
 * @param isPatch 是否需要局部更新，如果需要請傳遞 { addKey?: boolean } 或者 true，如果為 ture 或者對象裡面沒有指定 addKey，則不會添加主鍵字段，否則將會添加一個主鍵字段
 * @param triggerText 觸發文字配置
 */
export declare type updateProps = {
    /** 
     * 點擊確定後的回調，請返回 boolean 類型
     * @param key 更新行的主鍵的值
     * @param changes 修改後的數據
     */
    onFinish: (key: any, changes: object) => Promise<boolean>;
    /** 類型，支持 行內編輯 和 抽屜彈出表單編輯 */
    type?: 'line' | 'drawer';
    /** 是否需要局部更新，如果需要請傳遞 { addKey?: boolean } 或者 true，如果為 ture 或者對象裡面沒有指定 addKey，則不會添加主鍵字段，否則將會添加一個主鍵字段 */
    isPatch?: { addKey?: boolean } | boolean;
    /** 觸發文字配置 */
    triggerText?: string;
};

/**
 * 增刪改的配置項目
 * @param post 添加功能配置項目
 * @param delete 刪除功能配置項目
 * @param update 編輯功能配置項目
 */
export declare type cudProps = {
    /** 添加功能配置項目 */
    post?: postProps,
    /** 刪除功能配置項目 */
    delete?: deleteProps,
    /** 編輯功能配置項目 */
    update?: updateProps
};

/**
 * 表格的配置參數，大部分參數繼承自 ProTableProps
 * @param {cudProps} cudProps 增刪改的配置（拓展功能），by tuyeye
 */
export declare type TuyeeTableProps = ProTableProps<any, any> & {
    value?: any[],
    onChange?: (value: any[]) => void,
    recordCreatorProps?: false,
    /** 增刪改的配置項目, 拓展功能 by tuyeye ,github:https://github.com/tuyeye */
    cudProps?: cudProps;
};
export default TuyeeTable;