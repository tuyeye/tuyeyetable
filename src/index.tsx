import * as React from "react";
import { EditableProTable } from "@ant-design/pro-table";
import type {
  comptsBaseProps,
  CustomForm,
  formsSingle,
  postProps,
  deleteProps,
  updateProps,
  cudProps,
  TuyeeTableProps,
} from "./types";
import myUtils from "./utils";

const { useState, useEffect } = React;

const tuyeeTable: React.FC<TuyeeTableProps> = (originProps) => {
  const {
    toolBarRender,
    cudProps,
    headerTitle,
    columns,
    options,
    scroll,
  } = originProps;
  const [props, setProps] = useState<TuyeeTableProps>(originProps);
  const [editRows, setEditRows] = useState<object[]>([]);

  useEffect(() => {
    const tableProps: TuyeeTableProps = { ...props };

    //為了美觀，默認處理了一些api
    tableProps.options = options ?? {};
    tableProps.recordCreatorProps = false;
    tableProps.scroll = scroll ?? { scrollToFirstRowOnChange: true, x: true };

    //計算 toolBarRender 是否有必要渲染
    const isNeedToolBar =
      cudProps?.post !== undefined ||
      toolBarRender !== undefined ||
      headerTitle !== undefined;
    //優化一下當不開啟分頁時候，表格底部直接觸底，造成的不美觀
    if (!isNeedToolBar) {
      tableProps.toolBarRender = false;
    } else {
      tableProps.tableStyle = { paddingBottom: 20 };
      //重置操作欄
      tableProps.toolBarRender = (action, row) => {
        const origin = toolBarRender ? toolBarRender(action, row) : [];

        let add: React.ReactNodeArray = [];
        if (cudProps && cudProps.post) {
          const TheAdd = myUtils.addTrigger(cudProps.post);
          add = [<TheAdd key={"1"} />];
        }

        return [...origin, ...add];
      };
    }

    //判斷是否添加行內編輯的配置
    if (cudProps && cudProps.update) {
      const { onFinish, type, isPatch } = cudProps.update;

      if (type === "line") {
        tableProps.editable = {
          type: "single",
          actionRender: (row: any, config: any, dom: any) => [
            dom.save,
            dom.cancel,
          ],
          onChange: (_, editableRows) => {
            if (editableRows.length > 0) setEditRows(editableRows);
          },
          onSave: (key, changes) => {
            let data = changes;
            if (isPatch) {
              if (isPatch !== true && isPatch.addKey)
                data = myUtils.getChangesParams(changes, editRows[0], {
                  key: tableProps.rowKey as string,
                });
              else data = myUtils.getChangesParams(changes, editRows[0]);
            }
            return onFinish(key, data);
          },
        };
      }
    }

    //重置和整合了colunms
    if (columns) {
      const originOptions = columns.filter((p) => p.valueType === "option");

      tableProps.columns = [...columns.filter((p) => p.valueType !== "option")];

      if (
        originOptions.length > 0 ||
        (cudProps && cudProps.update) ||
        (cudProps && cudProps.delete)
      ) {
        tableProps.columns.push({
          title: "操作",
          valueType: "option",
          render: (dom, row, index, action, schema) => {
            const result: React.ReactNode[] = [];

            for (const e of originOptions) {
              if (e.render)
                result.push(e.render(dom, row, index, action, schema));
            }

            if (cudProps && cudProps.update) {
              const TheUpdate = myUtils.updateTrigger(
                cudProps.update,
                row[tableProps.rowKey as string],
                action,
                columns,
                row,
                tableProps.rowKey as string
              );
              result.push(<TheUpdate key={"update" + index} />);
            }

            if (cudProps && cudProps.delete) {
              const TheDelete = myUtils.deleteTrigger(
                cudProps.delete,
                row,
                action
              );
              result.push(<TheDelete key={"delete" + index} />);
            }

            return result;
          },
        });
      }
    }

    setProps(tableProps);
  }, [editRows]);

  return <EditableProTable {...props} />;
};
export type {
  comptsBaseProps,
  CustomForm,
  formsSingle,
  postProps,
  deleteProps,
  updateProps,
  cudProps,
  TuyeeTableProps,
};
export default tuyeeTable;
