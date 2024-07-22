"use client";

import { Button, List, Row } from "antd";
import React, { useState, useRef } from "react";
import type { editItem } from "../types";
import { useEditModal } from "./EditModal";

export function CropperList() {
  const modalProps = useRef<editItem>();

  const { setShowEditModal, EditModal } = useEditModal();

  const [list, setList] = useState<editItem[]>([
    {
      id: "1",
      name: "区域1",
    },
  ]);

  const handleAddArea = () => {
    const newItem = {
      id: "2",
      name: "区域2",
    };
    modalProps.current = newItem;
    console.log(EditModal, 'EditModal')
    setShowEditModal(true);
  };

  return (
    <div>
      <div className="h-[70px] w-full flex justify-center items-center mb-4 bg-gray-100">
        <Button type="primary" className="w-[80%]" onClick={handleAddArea}>
          创建一个新的书写区域
        </Button>
      </div>
      <List
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Row className="w-full" justify="space-between">
              <Button className="w-[50%]">{item.name}</Button>
              <Button className="w-[20%]" type="primary">
                编辑
              </Button>
              <Button className="w-[20%]" type="primary" danger>
                删除
              </Button>
            </Row>
          </List.Item>
        )}
      />
      <EditModal {...modalProps.current} />
    </div>
  );
}
