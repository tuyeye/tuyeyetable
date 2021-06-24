#### 對 umi 的 ProTable 進行了拓展和美化樣式和邏輯，新增 “增”、“刪”、“改”，快速開始 CURD，能夠大幅提高前端開發人員的效率。

## 📦 Install

```bash
npm install tuyeyetable
```

```bash
yarn add tuyeyetable
```

## 🔨 Usage

```tsx
import * as React from "react";
import { Alert, message } from 'antd';
import TuyeeTable, { TuyeeTableProps, cudProps } from 'tuyeyetable';
import { ProFormText } from '@ant-design/pro-form';


//生成mock數據
const valueEnum = {
    0: 'close',
    1: 'running',
    2: 'online',
    3: 'error',
};

export type TableListItem = {
    key: number;
    name: string;
    containers: number;
    creator: string;
    status: string;
    createdAt: number;
    memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
    tableListDataSource.push({
        key: i,
        name: 'AppName',
        containers: Math.floor(Math.random() * 20),
        creator: creators[Math.floor(Math.random() * creators.length)],
        status: valueEnum[Math.floor(Math.random() * 10) % 4],
        createdAt: Date.now() - Math.floor(Math.random() * 100000),
        memo: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
    });
}



const page: React.FC = () => {

    const cudProps: cudProps = {
        post: {
            forms: [
                {
                    title: "案例一：JSON表單（SchemaForm，快捷）",
                    type: "json",
                    columns: [{
                        title: "應用名稱",
                        dataIndex: "name",
                        formItemProps: {
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        }
                    }],
                    onFinish: async value => {
                        message.success(JSON.stringify(value))
                        return true;
                    }
                },
                {
                    title: "案例二：高度自定義的表單（推薦）",
                    type: "custom",
                    columns: [
                        {
                            compt: form => <ProFormText label="ProForm 自帶表單元素" name="ProForm" rules={[{ required: true }]} />
                        },
                        {
                            renderFormItem: {
                                label: "自定義組件，並且渲染出FormItem",
                                name: "diyValue",
                                rules: [{
                                    required: true
                                }]
                            },
                            compt: form => <div style={{ background: '#f50', padding: 20, color: "#fff" }} onClick={() => {
                                form.setFieldsValue({ diyValue: "我愛tuyeeTable" });
                                message.success("成功設置了diyValue的值")
                            }}>
                                我是自定義組件，由一個 div 組成，我通過 renderFormItem 渲染了 ProForm.Item 元素，點我可以設置表單的 diyValue 的值
                            </div>
                        },
                        {
                            compt: form => <Alert message="我是一個 antd 組件，我沒有設置 renderFormItem 參數，沒有渲染 ProForm.Item 元素，沒有處理任何東西" closable />
                        }
                    ],
                    onFinish: async value => {
                        message.success(JSON.stringify(value))
                        return true;
                    }
                }
            ],
            title: "案例"
        },
        update: {
            onFinish: async (key, data) => {
                message.success(JSON.stringify(data));
                return true;
            },
            isPatch: { addKey: true }
        },
        delete: {
            onFinish: async (row, action) => {
                message.success(JSON.stringify(row));
                return true;
            }
        }
    };


    const tableProps: TuyeeTableProps = {
        rowKey: "key",
        columns: [
            {
                title: '应用名称',
                dataIndex: 'name',
            },
            {
                title: '创建者',
                dataIndex: 'creator',
                valueType: 'select',
                valueEnum: {
                    all: { text: '全部' },
                    付小小: { text: '付小小' },
                    曲丽丽: { text: '曲丽丽' },
                    林东东: { text: '林东东' },
                    陈帅帅: { text: '陈帅帅' },
                    兼某某: { text: '兼某某' },
                },
            },
            {
                title: "创建时间",
                tooltip: "这是一段描述",
                dataIndex: 'createdAt',
                valueType: "dateTime",
                sorter: (a, b) => a.createdAt - b.createdAt,
            },
            {
                title: "操作",
                valueType: "option",
                render: (_, row) => [<a onClick={() => alert(row.creator)}>操作一</a>]
            },
            {
                title: "操作",
                valueType: "option",
                render: (_, row) => [<a onClick={() => alert(row.createdAt)}>操作二</a>]
            },
        ],
        search: {},
        request: (params, sorter, filter) => Promise.resolve({ data: tableListDataSource, success: true }),
        pagination: {},

        /**
         * new api
         */
        cudProps
    };

    return <TuyeeTable {...tableProps} />;
}

export default page;
```

## ⌨️ Development

```bash
$ git clone git@github.com:tuyeye/TuyeeTable.git
$ cd TuyeeTable
$ npm install
$ npm start
```

Open your browser and visit http://127.0.0.1:3333

## 🏆 Props（ProTableProps & EditableProTableProps & cudProps）

ProTableProps & EditableProTableProps :https://procomponents.ant.design/components/table#api

### cudProps

| 屬性 | 類型 | 描述 | 默認值 |
| ------ | ------ | ------ | ------ |
| post | postProps or undefined | 添加功能配置項目，設置此參數將會在表格左上角渲染出一個“➕” | undefined |
| delete | deleteProps or undefined | 刪除功能配置項目，設置此參數將會在option中添加一個刪除按鈕 | undefined |
| update | updateProps or undefined | 編輯功能配置項目，設置此參數將會在option中添加一個編輯按鈕 | undefined |

### cudProps.post

| 屬性 | 類型 | 描述 | 默認值 |
| ------ | ------ | ------ | ------ |
| forms | formsSingle[] | 表單數組	 | - |
| title | string | 添加的默認標題 | - |
| type	 | "ModalForm" or "DrawerForm" | 類型（僅限forms數組長度為1時生效，超過1個則採用DrawerForm），ModalForm 或者 DrawerForm，默認 DrawerForm | "DrawerForm" |

### cudProps.post.formsSingle

| 屬性 | 類型 | 描述 | 默認值 |
| ------ | ------ | ------ | ------ |
| title | string | 此項表單的標題	 | - |
| type | "json" or "custom" | json（官方自帶表單，不需要自定義組件內嵌時使用， 和 table 的 columns 配置項語法相同） 、custom（自定義表單，需要自定義組件來實現最終的表單的數據時使用） | - |
| columns	 | ProFormColumnsType<any, any>[] or CustomForm[] | 根據你選的type，來填入對應類型的表單項 | - |
| onFinish	 | 	(params: any) => Promise<boolean> | 表單提交回調方法，Promise<boolean> ，請返回 true 或者false | - |
| width	 | number | 	可選，表單的寬度 | 400 |
    
### cudProps.post.formsSingle.CustomForm

| 屬性 | 類型 | 描述 | 默認值 |
| ------ | ------ | ------ | ------ |
| renderFormItem | FormItemProps or undefined | ProForm.Item 的配置項，詳細細節查看 ProForm 官網，不設置則不渲染 ProForm.Item | - |
| compt | (form: FormInstance) => JSX.Element | 表單受控 form 參數，可通過此參數控制 form，詳細用法見 antd 官網 | - |
    
### cudProps.delete
    
| 屬性 | 類型 | 描述 | 默認值 |
| ------ | ------ | ------ | ------ |
| onFinish | (row: any, action: ActionType | undefined) => Promise<boolean> | 點擊確定後的回調，（row：當前行的數據，action：tableAction），請返回 boolean 類型	 | - |
| content | string | 提示內容 | 	"你确定要移除此行吗？" |
| triggerText | string | 觸發彈窗按鈕的文字配置 | "删除" |
    
### cudProps.update
       
| 屬性 | 類型 | 描述 | 默認值 |
| ------ | ------ | ------ | ------ |
| onFinish | (key: any, changes: object) => Promise<boolean> | 點擊確定後的回調，請返回 boolean 類型 | - |
| type | "line" or "drawer" | 類型，支持 行內編輯 和 抽屜彈出表單編輯 | - |
| isPatch | { addKey?: boolean } or boolean | 是否需要局部更新，如果需要請傳遞 { addKey?: boolean } 或者 true，如果為 ture 或者對象裡面沒有指定 addKey，則不會添加主鍵字段，否則將會添加一個主鍵字段，設置此參數後，onFinish 中的changes會因此而改變 | - |
| triggerText |string | 觸發文字配置 | "編輯" |
